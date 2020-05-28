import React, { useReducer } from "react";
import axios from "axios";
import QuestionsContext from "./questionsContext";
import QuestionsReducer from "./questionsReducer";
import { GET_QUESTIONS, SET_LOADING } from "../types";

const QuestionsState = (props) => {
  const initialState = {
    questions: [
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 1, // MODIFIED
        question_name: "Adresse email du client",
        question_subtitle: "Step 1: email", // ADDED MY ME
        question_type_id: 8,
        question_type_name: "email",
        box_values: null,
        parameters: null,
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 2,
        question_name: "Nom du client",
        question_subtitle: "Step 2: short text",
        question_type_id: 6,
        question_type_name: "short_text",
        box_values: null,
        parameters: null,
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 3,
        question_name: "Quelle est la marque de la chaudière à fioul ?",
        question_subtitle: "Step 3: single choice",
        question_type_id: 2,
        question_type_name: "single_choice",
        box_values: [
          {
            id: 15,
            label: "Vaillant",
            next_id_if_selected: "",
          },
          {
            id: 19,
            label: "Viessmann",
            next_id_if_selected: "",
          },
          {
            id: 16,
            label: "Saint Roch",
            next_id_if_selected: "",
          },
          {
            id: 18,
            label: "Elco",
            next_id_if_selected: "",
          },
          {
            id: 17,
            label: "Buderus",
            next_id_if_selected: "",
          },
          {
            id: 20,
            label: "Other",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: null,
      },
      {},
      {},
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 6,
        question_name: "La chaudière fioul est-elle à condensation ?",
        question_subtitle: "Step 6: yes/no",
        question_type_id: 3,
        question_type_name: "yes_no",
        box_values: [
          {
            id: 13,
            label: "True",
            next_id_if_selected: "",
          },
          {
            id: 14,
            label: "False",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 7,
        question_name: "Numéro de maison du client",
        question_subtitle: "Step 7: number",
        question_type_id: 9,
        question_type_name: "number",
        box_values: null,
        parameters: [
          {
            id: 4,
            name: "max_value",
            value: 100,
          },
          {
            id: 3,
            name: "min_value",
            value: 10,
          },
        ],
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 8,
        question_name: "Dans le cadre de l'entretien de la chaudière fioul",
        question_subtitle: "Step 8: multiple choice",
        question_type_id: 1,
        question_type_name: "multiple_choice",
        box_values: [
          {
            id: 6,
            label: "Nettoyage du filtre à mazout",
            next_id_if_selected: "",
          },
          {
            id: 9,
            label: "Ramonage du conduit de fumée",
            next_id_if_selected: "",
          },
          {
            id: 10,
            label: "Test de combustion + réglages",
            next_id_if_selected: "",
          },
          {
            id: 11,
            label: "Test de la dureté de l eau",
            next_id_if_selected: "",
          },
          {
            id: 12,
            label: "Other",
            next_id_if_selected: "",
          },
          {
            id: 5,
            label: "Nettoyage du corps de chauffe",
            next_id_if_selected: "",
          },
          {
            id: 7,
            label: "Nettoyage du bruleur",
            next_id_if_selected: "",
          },
          {
            id: 8,
            label: "Changement du gicleur",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: null,
      },
      {},
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 10,
        question_name: "Numéro de téléphone",
        question_subtitle: "Step 10: phone number",
        question_type_id: 10,
        question_type_name: "phone_number",
        box_values: null,
        parameters: null,
        default_next_id: null,
      },
    ],
    loading: false,
  };

  const [state, dispatch] = useReducer(QuestionsReducer, initialState);

  // get questions from DB
  const getQuestions = async () => {
    // setLoading();
    // req user from api
    // const res = await axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://preprod.hike-up.be/api/getATH/0251455c-65b7-4003-836c-2928a9b81b3d/13"
    // );
    // dispatch({
    //   type: GET_QUESTIONS,
    //   payload: res.data,
    // });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <QuestionsContext.Provider
      value={{
        questions: state.questions,
        loading: state.loading,
        getQuestions,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
