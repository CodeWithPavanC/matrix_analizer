import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/components/pages/HomePage';
import MatrixInputPage from '@/components/pages/MatrixInputPage';
import AnalysisPage from '@/components/pages/AnalysisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<MatrixInputPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
