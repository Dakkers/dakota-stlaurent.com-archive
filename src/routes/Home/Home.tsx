import React from "react";

function Home() {
  return (
    <div>
      <p>
        Hi there! I'm Dakota St. Laurent – welcome to my website. I'm currently
        a senior software engineer at{" "}
        <a href="https://applyboard.com/">ApplyBoard</a>.
      </p>

      <p>
        If you're here to find out more about my technical background, you're
        better off looking at my{" "}
        <a href="https://www.linkedin.com/in/dakotastlaurent/">LinkedIn</a>,
        looking at my <a href="https://github.com/Dakkers">GitHub</a>, or asking
        me for my resume.
      </p>

      <hr />

      {/* @ts-expect-error Lol */}
      <blink>🚧 This site is under construction 🚧</blink>
    </div>
  );
}

export { Home };
