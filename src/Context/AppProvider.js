import axios from "axios";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const API_ENDPOINT = "https://opentdb.com/api.php?";

  const table = {
    sports: 21,
    history: 23,
    politics: 24,
  };

  const fetchQuestion = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios.get(url).catch((err) => console.log(err));

      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return (index = 0);
      }
      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      });
    }
    nextQuestion();
  };

  const closeModal = () => {
    setWaiting(true);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestion(url);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        waiting,
        questions,
        error,
        index,
        correct,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
