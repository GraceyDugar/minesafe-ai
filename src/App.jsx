import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pipeline from './components/Pipeline'
import HazardDetector from './components/HazardDetector'
import DigitalTwin from './components/DigitalTwin'
import PathNavigator from './components/PathNavigator'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Pipeline />
      <HazardDetector />
      <DigitalTwin />
      <PathNavigator />
      <Dashboard />
      <Footer />
    </>
  )
}