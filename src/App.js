import { useEffect, useState } from 'react';
import './App.css';
import AssessmentData from "./data/Assessment.json"
import Assessment from "./components/Assessment"
import { getRandomInt } from './utils/numbers';
import { LOADING_TIME } from './constants';

function App() {
  const [assessmentList, setAssessmentList] = useState([])
  const [currentAssessment, setCurrentAssessment] = useState(null);

  useEffect(() => {
    const getAssessmentList = () => {
      setAssessmentList(AssessmentData);
    }
    getAssessmentList();
  }, [])

  useEffect(() => {
    if (assessmentList.length > 0) {
      showAssessment();
    }
  }, [assessmentList])

  const showAssessment = () => {
    setCurrentAssessment(null);
    setTimeout(() => {
      const randomAssessmentId = getRandomInt(assessmentList.length);
      setCurrentAssessment(assessmentList[randomAssessmentId]);
    }, LOADING_TIME * 1000);
  }

  return (
    <div className="App">
      {currentAssessment ?
        <>
          <div className="currentAssessment"><Assessment assessment={currentAssessment} showNextAssessment={showAssessment} /></div>
          <button onClick={showAssessment} >Prossimo Test</button>
        </>
        :
        <div>Loading</div>
      }
    </div >
  );
}

export default App;
