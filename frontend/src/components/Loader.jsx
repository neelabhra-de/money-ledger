export default function Loader({ text = "Loading..." }) {
  return (
    <div className="page-center">
      <div className="card loader-card">
        <div className="spinner" />
        <p>{text}</p>
      </div>
    </div>
  );
}
