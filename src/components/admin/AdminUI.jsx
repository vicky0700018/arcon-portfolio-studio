import { useState } from "react";

export function TextField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        className="field"
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea className="field" rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select className="field" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2.5 py-2">
      <input
        type="checkbox"
        className="size-4 rounded border-border accent-royal"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}

export function PanelHeader({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Panel({ children, className = "" }) {
  return <div className={`card-base p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function SavedNote({ shown }) {
  if (!shown) return null;
  return <span className="text-sm font-semibold text-teal">Saved to this browser.</span>;
}

/**
 * Renders form controls from a field spec against a draft object.
 */
export function FieldGrid({ fields, draft, onField }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const wide = f.type === "textarea" || f.wide;
        return (
          <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
            {f.type === "textarea" ? (
              <TextArea label={f.label} value={draft[f.key]} onChange={(v) => onField(f.key, v)} />
            ) : f.type === "select" ? (
              <SelectField label={f.label} value={draft[f.key]} onChange={(v) => onField(f.key, v)} options={f.options} />
            ) : f.type === "check" ? (
              <CheckField label={f.label} value={draft[f.key]} onChange={(v) => onField(f.key, v)} />
            ) : f.type === "list" ? (
              <TextField
                label={`${f.label} (comma separated)`}
                value={Array.isArray(draft[f.key]) ? draft[f.key].join(", ") : draft[f.key]}
                onChange={(v) => onField(f.key, v.split(",").map((s) => s.trim()).filter(Boolean))}
              />
            ) : (
              <TextField label={f.label} value={draft[f.key]} onChange={(v) => onField(f.key, v)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Generic CRUD editor for an array section in the portfolio store.
 */
export function CollectionEditor({
  title,
  description,
  items,
  fields,
  blank,
  labelOf,
  metaOf,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
}) {
  const [draft, setDraft] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const startAdd = () => {
    setEditingId("new");
    setDraft({ ...blank });
  };
  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft({ ...item });
  };
  const cancel = () => {
    setEditingId(null);
    setDraft(null);
  };
  const save = () => {
    if (editingId === "new") onAdd(draft);
    else onUpdate(editingId, draft);
    cancel();
  };
  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div>
      <PanelHeader title={title} description={description}>
        <button type="button" className="btn btn-primary btn-sm" onClick={startAdd}>
          + Add new
        </button>
      </PanelHeader>

      {draft ? (
        <Panel className="mb-6">
          <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">
            {editingId === "new" ? "New entry" : "Edit entry"}
          </h3>
          <FieldGrid fields={fields} draft={draft} onField={setField} />
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={save}>
              Save
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={cancel}>
              Cancel
            </button>
          </div>
        </Panel>
      ) : null}

      <ul className="grid gap-3">
        {items.map((item, index) => (
          <li key={item.id} className="card-base flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{labelOf(item)}</p>
              {metaOf ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{metaOf(item)}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {onMove ? (
                <>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    aria-label={`Move ${labelOf(item)} up`}
                    disabled={index === 0}
                    onClick={() => onMove(item.id, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    aria-label={`Move ${labelOf(item)} down`}
                    disabled={index === items.length - 1}
                    onClick={() => onMove(item.id, 1)}
                  >
                    ↓
                  </button>
                </>
              ) : null}
              <button type="button" className="btn btn-outline btn-sm" onClick={() => startEdit(item)}>
                Edit
              </button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="card-base p-6 text-center text-sm text-muted-foreground">Nothing here yet. Add your first entry.</li>
        ) : null}
      </ul>
    </div>
  );
}
