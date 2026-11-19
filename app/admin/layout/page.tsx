"use client";

import { useState, useEffect, useTransition } from "react";
import {
  createProduct,
  getProducts,
  deleteProduct,
  addInput,
  deleteInput,
  addOutput,
  deleteOutput,
  addProcess,
  updateProcess,
  deleteProcess,
  reorderProcesses,
} from "./actions";
import { IProduct, IProcess } from "./types";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [, startTransition] = useTransition();

  // INPUT states
  const [inDate, setInDate] = useState("");
  const [inWork, setInWork] = useState("");
  const [inPieces, setInPieces] = useState(0);
  const [inNote, setInNote] = useState("");

  // OUTPUT states
  const [outDate, setOutDate] = useState("");
  const [outPieces, setOutPieces] = useState(0);
  const [outNote, setOutNote] = useState("");

  // PROCESS states
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pLabel, setPLabel] = useState("");
  const [editing, setEditing] = useState<IProcess | null>(null);

  // ---------- Initial Load ----------
  useEffect(() => {
    (async () => {
      const list = await getProducts();
      setProducts(list);
      if (list.length) setSelected(list[0]);
      setLoading(false);
    })();
  }, []);

  const refresh = async () => {
    const list = await getProducts();
    setProducts(list);
    if (selected) {
      setSelected(list.find((p: IProduct) => p._id === selected._id) || null);
    }
  };

  // ---------- Product ----------
  const handleCreate = () => {
    if (!newName.trim()) return;
    startTransition(async () => {
      const p = await createProduct(newName.trim());
      setProducts((prev) => [p, ...prev]);
      setSelected(p);
      setNewName("");
    });
  };

  const handleDeleteProduct = (id: string) => {
    startTransition(async () => {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (selected?._id === id) setSelected(null);
    });
  };

  // ---------- Input ----------
  const handleAddInput = () => {
    if (!selected || !inDate || !inWork || !inPieces) return;
    startTransition(async () => {
      await addInput(selected._id!, {
        date: inDate,
        workName: inWork,
        pieces: Number(inPieces),
        note: inNote,
      });
      setInDate(""); setInWork(""); setInPieces(0); setInNote("");
      await refresh();
    });
  };

  const handleDeleteInput = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteInput(selected._id!, id);
      await refresh();
    });
  };

  // ---------- Output ----------
  const handleAddOutput = () => {
    if (!selected || !outDate || !outPieces) return;
    startTransition(async () => {
      await addOutput(selected._id!, {
        date: outDate,
        pieces: Number(outPieces),
        note: outNote,
      });
      setOutDate(""); setOutPieces(0); setOutNote("");
      await refresh();
    });
  };

  const handleDeleteOutput = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteOutput(selected._id!, id);
      await refresh();
    });
  };

  // ---------- Process ----------
  const resetProcessForm = () => {
    setPTitle(""); setPDesc(""); setPLabel(""); setEditing(null);
  };

  const handleSubmitProcess = () => {
    if (!selected || !pTitle.trim()) return;
    startTransition(async () => {
      if (editing) {
        await updateProcess(selected._id!, editing._id!, {
          title: pTitle,
          description: pDesc,
          label: pLabel,
        });
      } else {
        await addProcess(selected._id!, {
          serial: 0,
          title: pTitle,
          description: pDesc,
          label: pLabel,
        });
      }
      resetProcessForm();
      await refresh();
    });
  };

  const handleEditProcess = (p: IProcess) => {
    setEditing(p);
    setPTitle(p.title);
    setPDesc(p.description || "");
    setPLabel(p.label || "");
  };

  const handleDeleteProcess = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteProcess(selected._id!, id);
      await refresh();
    });
  };

  const handleMoveProcess = (id: string, dir: -1 | 1) => {
    if (!selected) return;
    const list = [...selected.processes].sort((a, b) => a.serial - b.serial);
    const idx = list.findIndex((p) => p._id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= list.length) return;
    [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
    startTransition(async () => {
      await reorderProcesses(selected._id!, list.map((p) => p._id!));
      await refresh();
    });
  };

  // ---------- Loading screen ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📦 Product Manager</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* ================= Sidebar ================= */}
          <aside className="bg-white rounded-2xl shadow p-4 md:col-span-1">
            <h2 className="font-semibold mb-3">Products</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New product"
                className="border rounded px-2 py-1 flex-1 text-sm"
              />
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                +
              </button>
            </div>
            <ul className="space-y-1">
              {products.map((p) => (
                <li key={p._id} className="flex items-center justify-between group">
                  <button
                    onClick={() => setSelected(p)}
                    className={`text-left flex-1 px-2 py-1 rounded ${
                      selected?._id === p._id ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {p.name}
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p._id!)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 text-xs px-1"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ================= Main ================= */}
          <main className="md:col-span-3 space-y-6">
            {!selected ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                Select or create a product
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{selected.name}</h2>

                {/* ---------- INPUT ---------- */}
                <section className="bg-white rounded-2xl shadow p-5">
                  <h3 className="font-semibold mb-3">📥 Input (কোন দিন কি কাজ, কত পিস)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                    <input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <input placeholder="Work name" value={inWork} onChange={(e) => setInWork(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <input type="number" placeholder="Pieces" value={inPieces || ""} onChange={(e) => setInPieces(Number(e.target.value))} className="border rounded px-2 py-1 text-sm" />
                    <input placeholder="Note" value={inNote} onChange={(e) => setInNote(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <button onClick={handleAddInput} className="bg-green-600 text-white rounded text-sm py-1">Add</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 text-left">
                        <tr>
                          <th className="px-2 py-1">Date</th>
                          <th className="px-2 py-1">Work</th>
                          <th className="px-2 py-1">Pieces</th>
                          <th className="px-2 py-1">Note</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.inputs.map((i) => (
                          <tr key={i._id} className="border-b">
                            <td className="px-2 py-1">{i.date}</td>
                            <td className="px-2 py-1">{i.workName}</td>
                            <td className="px-2 py-1">{i.pieces}</td>
                            <td className="px-2 py-1">{i.note}</td>
                            <td><button onClick={() => handleDeleteInput(i._id!)} className="text-red-500 text-xs">✕</button></td>
                          </tr>
                        ))}
                        {selected.inputs.length === 0 && (
                          <tr>
                            <td colSpan={5} className="text-center text-gray-400 py-3 text-xs">No input yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* ---------- OUTPUT ---------- */}
                <section className="bg-white rounded-2xl shadow p-5">
                  <h3 className="font-semibold mb-3">📤 Output (কোন দিন কত পিস)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
                    <input type="date" value={outDate} onChange={(e) => setOutDate(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <input type="number" placeholder="Pieces" value={outPieces || ""} onChange={(e) => setOutPieces(Number(e.target.value))} className="border rounded px-2 py-1 text-sm" />
                    <input placeholder="Note" value={outNote} onChange={(e) => setOutNote(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <button onClick={handleAddOutput} className="bg-orange-600 text-white rounded text-sm py-1">Add</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 text-left">
                        <tr>
                          <th className="px-2 py-1">Date</th>
                          <th className="px-2 py-1">Pieces</th>
                          <th className="px-2 py-1">Note</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.outputs.map((o) => (
                          <tr key={o._id} className="border-b">
                            <td className="px-2 py-1">{o.date}</td>
                            <td className="px-2 py-1">{o.pieces}</td>
                            <td className="px-2 py-1">{o.note}</td>
                            <td><button onClick={() => handleDeleteOutput(o._id!)} className="text-red-500 text-xs">✕</button></td>
                          </tr>
                        ))}
                        {selected.outputs.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center text-gray-400 py-3 text-xs">No output yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* ---------- PROCESS ---------- */}
                <section className="bg-white rounded-2xl shadow p-5">
                  <h3 className="font-semibold mb-3">⚙️ Process List (কাজের ধাপ)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                    <input placeholder="Title" value={pTitle} onChange={(e) => setPTitle(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <input placeholder="Description" value={pDesc} onChange={(e) => setPDesc(e.target.value)} className="border rounded px-2 py-1 text-sm sm:col-span-2" />
                    <input placeholder="Label" value={pLabel} onChange={(e) => setPLabel(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                    <button onClick={handleSubmitProcess} className="bg-purple-600 text-white rounded text-sm py-1">
                      {editing ? "Update" : "Add"}
                    </button>
                  </div>
                  {editing && (
                    <button onClick={resetProcessForm} className="text-xs text-gray-500 mb-2 underline">
                      Cancel edit
                    </button>
                  )}
                  <ul className="space-y-2">
                    {[...selected.processes]
                      .sort((a, b) => a.serial - b.serial)
                      .map((p) => (
                        <li key={p._id} className="flex items-start gap-2 border rounded-lg p-2 bg-gray-50">
                          <span className="bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                            {p.serial}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium">{p.title}</div>
                            {p.description && <div className="text-sm text-gray-600">{p.description}</div>}
                            {p.label && (
                              <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {p.label}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 text-xs">
                            <button onClick={() => handleMoveProcess(p._id!, -1)} className="text-gray-500">↑</button>
                            <button onClick={() => handleMoveProcess(p._id!, 1)} className="text-gray-500">↓</button>
                          </div>
                          <button onClick={() => handleEditProcess(p)} className="text-blue-600 text-xs">Edit</button>
                          <button onClick={() => handleDeleteProcess(p._id!)} className="text-red-500 text-xs">✕</button>
                        </li>
                      ))}
                    {selected.processes.length === 0 && (
                      <li className="text-center text-gray-400 py-3 text-xs">No process yet</li>
                    )}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}