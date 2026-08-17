export function FoodSketches() {
  return (
    <div className="foodSketches" aria-hidden="true">
      <svg className="foodSketch foodSketchRamen" viewBox="0 0 260 210" fill="none">
        <path d="M45 122h170" />
        <path d="M54 122c7 42 35 64 76 64s69-22 76-64" />
        <path d="M75 99c12-24 25-31 39-20 11 9 17 28 32 27 14-1 21-23 39-28" />
        <path d="M80 112c11-18 23-23 35-13 11 9 17 20 29 19 12-1 21-16 36-19" />
        <path className="foodSketchAccent" d="M190 70l31-35M202 80l31-35" />
        <path d="M92 66c-8-9-6-20 2-27M121 63c-8-9-6-20 2-27M151 65c-8-9-6-20 2-27" />
      </svg>

      <svg className="foodSketch foodSketchPizza" viewBox="0 0 230 210" fill="none">
        <path d="M35 43c58-20 111-18 162 3L116 180 35 43Z" />
        <path className="foodSketchAccent" d="M52 61c43-14 83-13 123 2" />
        <circle cx="94" cy="91" r="9" />
        <circle cx="139" cy="102" r="9" />
        <circle cx="112" cy="136" r="8" />
        <path d="M70 77c8 2 14 7 17 14M148 126c9 1 15 5 20 12" />
      </svg>

      <svg className="foodSketch foodSketchPasta" viewBox="0 0 230 220" fill="none">
        <ellipse cx="115" cy="151" rx="75" ry="34" />
        <path d="M58 149c8-39 29-61 58-61 34 0 48 26 20 41-26 14-49-12-30-32 16-17 54-12 68 17 8 17 4 34-9 45" />
        <path d="M72 151c17 13 36 19 58 17 21-2 39-10 52-24" />
        <path className="foodSketchAccent" d="M83 71c7-12 16-21 28-26M143 56c12 5 21 13 28 25" />
      </svg>

      <svg className="foodSketch foodSketchPlate" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="88" />
        <circle cx="120" cy="120" r="55" />
        <path d="M29 38v69M19 38v43c0 16 8 26 20 26s20-10 20-26V38M39 107v95" />
        <path d="M207 39c-19 15-28 35-28 60 0 13 6 22 17 25v78M207 39v163" />
      </svg>
    </div>
  );
}
