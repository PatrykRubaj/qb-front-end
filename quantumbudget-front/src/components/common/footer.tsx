import Link from 'next/link';
import { Route } from '../../redux/state';

const footer = () => (
  <footer className="pt-4 my-md-5 pt-md-5 border-top mt-4">
    <div className="row">
      <div className="col-12 col-md">
        <small className="d-block mb-3 text-muted">© 2020 Quantum Budget</small>
      </div>
      <div className="col-6 col-md">
        <h5>Contact me</h5>
        <ul className="list-unstyled text-small">
          <li>
            <Link href={Route.MessangerBot}>
              <a className="text-muted" rel="nofollow" target="_blank">
                Leave feedback
              </a>
            </Link>
          </li>
        </ul>
        <h5>Legal</h5>
        <ul className="list-unstyled text-small">
          <li>
            <Link href={Route.PrivacyPolicy}>
              <a className="text-muted" rel="nofollow">
                Privacy policy
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${Route.PrivacyPolicy}#cookie-policy`}>
              <a className="text-muted" rel="nofollow">
                Cookie policy
              </a>
            </Link>
          </li>
          <li>
            <Link href={Route.TermsOfService}>
              <a className="text-muted" rel="nofollow">
                Terms of Service
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default footer;
