import { certifications, completionLabels } from '../data/certifications';
import './Certifications.css';

export default function Certifications() {
  return (
    <section id="certifications" className="content-section" aria-labelledby="certifications-heading">
      <div className="section-heading">
        <h2 id="certifications-heading">// certifications.log</h2>
        <span>courses &amp; certifications</span>
      </div>
      <p className="section-intro">A learning record. Expand an entry for details and completion status.</p>
      <ul className="certification-log">
        {certifications.map((record, index) => (
          <li key={record.id}>
            <details className="certification-record">
              <summary>
                <span className="certification-index" aria-hidden="true">[{String(index + 1).padStart(2, '0')}]</span>
                <span className="certification-identity">
                  <span className="certification-title">{record.title}</span>
                  <span className="certification-issuer">{record.issuer ?? 'Issuer not confirmed'}</span>
                </span>
                <span className="certification-category">{record.category}</span>
                <span className="certification-toggle" aria-hidden="true" />
              </summary>
              <div className="certification-details">
                <dl>
                  <div><dt>Completion</dt><dd>{completionLabels[record.completionStatus]}{record.completionYear && ` (${record.completionYear})`}</dd></div>
                  <div><dt>Issuer</dt><dd>{record.issuer ?? 'Not confirmed'}</dd></div>
                  <div><dt>Category</dt><dd>{record.category}</dd></div>
                </dl>
                {record.details && <p>{record.details}</p>}
                {record.credentialUrl && (
                  <a className="certification-credential" href={record.credentialUrl}>
                    View Credential<span className="sr-only">: {record.title}</span>
                    <span aria-hidden="true"> ↗</span>
                  </a>
                )}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}