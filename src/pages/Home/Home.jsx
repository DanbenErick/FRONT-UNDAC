import AsideComponent from '../../components/Aside/AsideComponent';

import BodyComponent from '../Procesos/BodyComponent';

export default function Home() {
  return (
    <div className="containerGridDashboard">
      <div>
        <AsideComponent />
      </div>
      <div>
        <BodyComponent className="content" />
      </div>
    </div>
  );
}
