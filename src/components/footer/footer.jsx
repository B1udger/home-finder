export function Footer() {
  return (
    <div className="footer">
      <div className="bg-dark text-center text-white">
        <div
          className="text-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <span>© 2024 Copyright: </span>
          <a className="text-reset fw-bold" href="https://github.com/B1udger">
            Iliyan Stefanov
          </a>
          <span> & </span>
          <a
            className="text-reset fw-bold"
            href="https://github.com/m-georgiev01"
          >
            Martin Georgiev
          </a>
        </div>
      </div>
    </div>
  );
}
