import React, { useReducer, useContext } from "react";
import axios from "axios";
import QuestionsContext from "./questionsContext";
import QuestionsReducer from "./questionsReducer";
import { GET_QUESTIONS } from "../types";

// Create a custom hook to use the questions context
export const useQuestions = () => {
  const { state, dispatch } = useContext(QuestionsContext);
  return [state, dispatch];
};

// get questions from DB
export const getQuestions = async (dispatch) => {
  // // req user from api (nb: set loading to default to true)
  // const res = await axios.get(
  //   "https://cors-anywhere.herokuapp.com/https://preprod.hike-up.be/api/getATH/0251455c-65b7-4003-836c-2928a9b81b3d/13"
  // );
  // dispatch({
  //   type: GET_QUESTIONS,
  //   payload: res.data,
  // });
};

const QuestionsState = (props) => {
  const initialState = {
    questions: [
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 1,
        question_name: "Adresse email du client",
        question_subtitle: "Step 1: email",
        question_type_id: 8,
        question_type_name: "email",
        box_values: null,
        parameters: null,
        default_next_id: 2,
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
        default_next_id: 3,
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
            id: "15",
            label: "Vaillant",
            next_id_if_selected: "5",
          },
          {
            id: "19",
            label: "Viessmann",
            next_id_if_selected: "",
          },
          {
            id: "16",
            label: "Saint Roch",
            next_id_if_selected: "",
          },
          {
            id: "18",
            label: "Elco",
            next_id_if_selected: "",
          },
          {
            id: "17",
            label: "Buderus",
            next_id_if_selected: "",
          },
          {
            id: "20",
            label: "Other",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: 4,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 4,
        question_name: "Can we send you emails?",
        question_subtitle: "Step 4: legal",
        question_type_id: 4,
        question_type_name: "legal",
        box_values: [
          {
            id: "11",
            label: "True",
            next_id_if_selected: "",
          },
          {
            id: "12",
            label: "False",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: 5,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 5,
        question_name: "What is your opinion from 1 to 10?",
        question_subtitle: "Step 5: opinion scale",
        question_type_id: 7,
        question_type_name: "opinion_scale",
        box_values: [
          {
            id: "31",
            label: "1",
            next_id_if_selected: "",
          },
          {
            id: "32",
            label: "2",
            next_id_if_selected: "",
          },
          {
            id: "33",
            label: "3",
            next_id_if_selected: "",
          },
          {
            id: "34",
            label: "4",
            next_id_if_selected: "",
          },
          {
            id: "35",
            label: "5",
            next_id_if_selected: "",
          },
          {
            id: "36",
            label: "6",
            next_id_if_selected: "",
          },
          {
            id: "37",
            label: "7",
            next_id_if_selected: "",
          },
          {
            id: "38",
            label: "8",
            next_id_if_selected: "",
          },
          {
            id: "39",
            label: "9",
            next_id_if_selected: "",
          },
          {
            id: "40",
            label: "10",
            next_id_if_selected: "",
          },
        ],
        parameters: [
          {
            id: "54",
            name: "label_left",
            value: "-",
          },
          {
            id: "55",
            name: "label_right",
            value: "+",
          },
        ],
        default_next_id: 6,
      },
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
            id: "13",
            label: "True",
            next_id_if_selected: "",
          },
          {
            id: "14",
            label: "False",
            next_id_if_selected: "",
          },
        ],
        parameters: null,
        default_next_id: 7,
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
            id: "4",
            name: "max_value",
            value: "100",
          },
          {
            id: "3",
            name: "min_value",
            value: "10",
          },
        ],
        default_next_id: 8,
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
            id: "6",
            label: "Nettoyage du filtre à mazout",
          },
          {
            id: "9",
            label: "Ramonage du conduit de fumée",
          },
          {
            id: "10",
            label: "Test de combustion + réglages",
          },
          {
            id: "11",
            label: "Test de la dureté de l eau",
          },
          {
            id: "12",
            label: "Other",
          },
          {
            id: "5",
            label: "Nettoyage du corps de chauffe",
          },
          {
            id: "7",
            label: "Nettoyage du bruleur",
          },
          {
            id: "8",
            label: "Changement du gicleur",
          },
        ],
        parameters: null,
        default_next_id: 9,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 9,
        question_name: "How many stars do you rate us?",
        question_subtitle: "Step 9: rating",
        question_type_id: 5,
        question_type_name: "rating",
        box_values: null,
        parameters: [
          {
            id: "22",
            name: "steps",
            value: "10",
          },
        ],
        default_next_id: 10,
      },
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
        default_next_id: 12,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 11,
        question_name: "Welcome to the HikeUp Wizard Form",
        question_subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio incidunt sint cumque illo nobis exercitationem aliquam  repellendus.",
        question_picture: "https://via.placeholder.com/800x300/2e84dd",
        question_type_id: 15,
        question_type_name: "welcome",
        box_values: null,
        parameters: null,
        default_next_id: 1,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 12,
        question_name: "Remarques",
        question_subtitle: "Step 11: long text",
        question_type_id: 12,
        question_type_name: "long_text",
        box_values: null,
        parameters: null,
        default_next_id: 14,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 13,
        question_name: "Thank you for your submission",
        question_subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio incidunt sint cumque illo nobis exercitationem aliquam  repellendus.",
        question_picture: "https://via.placeholder.com/800x300/2e84dd",
        question_type_id: 16,
        question_type_name: "thank_you",
        box_values: null,
        parameters: null,
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 14,
        question_subtitle: "Step 12: file upload",
        question_name: "Photo installation 1",
        question_type_id: 13,
        question_type_name: "file_upload",
        box_values: null,
        parameters: null,
        default_next_id: 15,
      },
      {
        assessment_id: 13,
        assessment_name: "Suivi entretiens",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 15,
        question_name: "Do you want to proceed?",
        question_subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio incidunt sint cumque illo nobis exercitationem aliquam  repellendus.",
        question_type_id: 17,
        question_type_name: "recap",
        box_values: null,
        parameters: null,
        default_next_id: 13,
      },
    ],
    loading: false,
  };

  const [state, dispatch] = useReducer(QuestionsReducer, initialState);

  return (
    <QuestionsContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
