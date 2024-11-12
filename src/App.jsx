import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Movies from './pages/movies';
import Trailers from './pages/trailers';
import MovieDetail from './pages/movieDetail';

function App() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/peliculas" element={<Movies />} />
                <Route path="/trailers" element={<Trailers />} />
                <Route path="/pelicula/:id" element={<MovieDetail />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;