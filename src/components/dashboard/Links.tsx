import React from "react";

const Links = () => {
  return (
    <section>
      <ul className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <li>
              <div className="bg-muted/70 min-h-4 p-2 rounded-sm">
                <h2>{`Link-${i}`}</h2>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Links;
