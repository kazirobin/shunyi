import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Worker from "@/models/Worker";
import Attendance from "@/models/Attendance";
import ProductionRecord from "@/models/ProductionRecord";
import Inquiry from "@/models/Inquiry";
import Payroll from "@/models/Payroll";
import { format } from "date-fns";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

    const [
      totalWorkers,
      presentToday,
      absentToday,
      onLeaveToday,
      monthlyProduction,
      overtimeExpenses,
      recentInquiries,
      attendanceWeekly,
      productionWeekly,
    ] = await Promise.all([
      Worker.countDocuments({ isActive: true }),
      Attendance.countDocuments({
        date: { $gte: today, $lt: tomorrow },
        status: "present",
      }),
      Attendance.countDocuments({
        date: { $gte: today, $lt: tomorrow },
        status: "absent",
      }),
      Attendance.countDocuments({
        date: { $gte: today, $lt: tomorrow },
        status: "on-leave",
      }),
      ProductionRecord.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$actualOutput" },
          },
        },
      ]),
      Payroll.aggregate([
        {
          $match: {
            periodStart: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$overtimePay" },
          },
        },
      ]),
      Inquiry.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .select("inquiryId buyerName company productType status createdAt")
        .lean(),
      Attendance.aggregate([
        {
          $match: {
            date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$date" },
            present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
            absent: { $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] } },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id": 1 } },
      ]),
      ProductionRecord.aggregate([
        {
          $match: {
            date: { $gte: new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $week: "$date" },
            target: { $sum: "$targetOutput" },
            actual: { $sum: "$actualOutput" },
          },
        },
        { $sort: { "_id": 1 } },
      ]),
    ]);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const attendanceChart = dayNames.map((day, index) => {
      const dayData = attendanceWeekly.find((d) => d._id === index + 1);
      const total = dayData?.total || 1;
      return {
        day,
        present: dayData ? Math.round((dayData.present / total) * 100) : 0,
        absent: dayData ? Math.round((dayData.absent / total) * 100) : 0,
      };
    });

    const productionChart = productionWeekly.map((week, index) => ({
      week: `W${index + 1}`,
      target: week.target || 100,
      actual: week.actual || 0,
    }));

    return Response.json({
      stats: {
        totalWorkers,
        presentToday,
        absentToday,
        onLeaveToday,
        monthlyProduction: monthlyProduction[0]?.total || 0,
        overtimeExpenses: overtimeExpenses[0]?.total || 0,
      },
      recentInquiries: recentInquiries.map((inq) => ({
        id: inq.inquiryId,
        buyer: inq.buyerName,
        company: inq.company,
        product: inq.productType,
        status: inq.status,
        date: format(new Date(inq.createdAt), "yyyy-MM-dd"),
      })),
      attendanceChart,
      productionChart,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}