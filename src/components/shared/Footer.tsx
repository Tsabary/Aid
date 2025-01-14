function Footer() {
  return (
    <footer className="fixed bottom-0 px-4 py-2 bg-gray-100 w-full text-xs flex justify-between text-gray-500">
      <div>
        Open Source project by{" "}
        <a href="https://x.com/yantsab" className="hover:underline">
          Tsabary
        </a>{" "}
        {/* using{" "}
        <a href="https://replyke.com" className="hover:underline">
          Replyke
        </a> */}
      </div>
      <a
        href="https://github.com/Tsabary/Aid"
        className="hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
