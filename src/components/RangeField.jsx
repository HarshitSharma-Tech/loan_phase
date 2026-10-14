import { useId } from 'react';
import { clamp } from '../lib/finance';

/** Labelled slider + number input kept in sync. Keyboard and screen-reader friendly. */
export default function RangeField({ label, value, onChange, min, max, step, prefix, suffix, hint, dark }) {
  const id = useId();
  const safe = clamp(Number(value) || 0, min, max);
  return (
    <div className={`field ${dark ? 'on-dark' : ''}`}>
      <div className="field-head">
        <label htmlFor={`${id}-n`}>{label}</label>
        <div className="num-wrap">
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            id={`${id}-n`}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => onChange(safe)}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={safe}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${((safe - min) / (max - min)) * 100}%` }}
      />
      <div className="range-labels"><span>{hint?.[0]}</span><span>{hint?.[1]}</span></div>
    </div>
  );
}
