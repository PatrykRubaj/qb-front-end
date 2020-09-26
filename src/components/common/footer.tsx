import Link from "next/link";

const footer = () => (
  <footer className="pt-4 my-md-5 pt-md-5 border-top mt-4">
    <div className="row">
      <div className="col-12 col-md">
        <small className="d-block mb-3 text-muted">© 2020 Quantum Budget</small>
      </div>
      <div className="col-6 col-md">
        <h5>Legal</h5>
        <ul className="list-unstyled text-small">
          <li>
            <Link href="/privacy">
              <a className="text-muted" rel="nofollow">
                Privacy policy
              </a>
            </Link>
          </li>
          <li>
            <Link href="/privacy#cookie-policy">
              <a className="text-muted" rel="nofollow">
                Cookie policy
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default footer;
