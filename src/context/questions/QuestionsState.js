import React, { useReducer, useContext } from "react";

import axios from "axios";
import QuestionsContext from "./questionsContext";
import QuestionsReducer from "./questionsReducer";
import { GET_QUESTIONS, QUESTION_ERROR } from "../types";

// Create a custom hook to use the questions context
export const useQuestions = () => {
  const { state, dispatch } = useContext(QuestionsContext);
  return [state, dispatch];
};

// get questions from api
export const getQuestions = async (dispatch) => {
  // uncomment code block and add your url to the backend api
  // // req user from api (nb: set loadingQuestions to default to true)
  // try {
  //   const res = await axios.get(
  //     "https://url/to/api"
  //     // "path/to/api"
  //   );
  //   // console.log(res.data);
  //   dispatch({
  //     type: GET_QUESTIONS,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //   // console.log(error);
  //   dispatch({
  //     type: QUESTION_ERROR,
  //   });
  // }
};

const QuestionsState = (props) => {
  const initialState = {
    questions: [
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 1,
        question_name: "Veuillez entrer votre adresse email",
        question_subtitle: "Question Type 1: email",
        question_picture: null,
        question_required: false,
        question_type_id: 8,
        question_type_name: "email",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: null,
        parameters: null,
        default_next_id: 2,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 2,
        question_name: "Veuillez entrer votre nom",
        question_subtitle: "Question Type 2: short text",
        question_picture: null,
        question_required: true,
        question_type_id: 6,
        question_type_name: "short_text",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: null,
        parameters: null,
        default_next_id: 3,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 3,
        question_name: "Quelle est votre couleur bleue préférée ?",
        question_subtitle: "Question Type 3: single choice",
        question_picture: null,
        question_required: true,
        question_type_id: 2,
        question_type_name: "single_choice",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: [
          {
            id: "15",
            label: "Aquamarine",
            picture:
              "https://via.placeholder.com/600x150/7FFFD4/e3e6e9?text=Placeholder",
            next_id_if_selected: "",
            col_order: "1",
          },
          {
            id: "19",
            label: "Turquoise",
            picture:
              "https://via.placeholder.com/600x150/40E0D0/e3e6e9?text=Placeholder",
            next_id_if_selected: "",
            col_order: "3",
          },
          {
            id: "16",
            label: "SteelBlue",
            picture:
              "https://via.placeholder.com/600x150/4682B4/e3e6e9?text=Placeholder",
            next_id_if_selected: "",
            col_order: "2",
          },
          {
            id: "18",
            label: "RoyalBlue",
            picture:
              "https://via.placeholder.com/600x150/4169E1/e3e6e9?text=Placeholder",
            next_id_if_selected: "",
            col_order: "4",
          },
        ],
        parameters: [
          {
            id: "20",
            name: "other",
            value: "true",
          },
          {
            id: "98",
            name: "picture",
            value: "true",
          },
        ],
        default_next_id: 4,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 4,
        question_name: "Pouvons-nous vous contacter par email ?",
        question_subtitle: "Question Type 4: legal",
        question_picture: null,
        question_required: true,
        question_type_id: 4,
        question_type_name: "legal",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: [
          {
            id: "11",
            label: "Non",
            next_id_if_selected: "",
            col_order: "2",
          },
          {
            id: "12",
            label: "Oui",
            next_id_if_selected: "",
            col_order: "1",
          },
        ],
        parameters: null,
        default_next_id: 5,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 5,
        question_name:
          "Quelle note donneriez-vous aux animations de cette application ?",
        question_subtitle: "Question Type 5: opinion scale",
        question_picture: null,
        question_required: true,
        question_type_id: 7,
        question_type_name: "opinion_scale",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: [
          {
            id: "31",
            label: "1",
            next_id_if_selected: "",
            col_order: "1",
          },
          {
            id: "32",
            label: "2",
            next_id_if_selected: "",
            col_order: "2",
          },
          {
            id: "33",
            label: "3",
            next_id_if_selected: "",
            col_order: "3",
          },
          {
            id: "34",
            label: "4",
            next_id_if_selected: "",
            col_order: "4",
          },
          {
            id: "35",
            label: "5",
            next_id_if_selected: "",
            col_order: "5",
          },
          {
            id: "36",
            label: "6",
            next_id_if_selected: "",
            col_order: "6",
          },
          {
            id: "37",
            label: "7",
            next_id_if_selected: "",
            col_order: "7",
          },
          {
            id: "38",
            label: "8",
            next_id_if_selected: "",
            col_order: "8",
          },
          {
            id: "39",
            label: "9",
            next_id_if_selected: "",
            col_order: "9",
          },
          {
            id: "40",
            label: "10",
            next_id_if_selected: "",
            col_order: "10",
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
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 6,
        question_name: "Est-ce que vous êtes allergiques aux chats ?",
        question_subtitle: "Question Type 6: yes/no",
        question_picture: null,
        question_required: true,
        question_type_id: 3,
        question_type_name: "yes_no",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: [
          {
            id: "13",
            label: "Non",
            next_id_if_selected: "",
            col_order: "2",
          },
          {
            id: "14",
            label: "Oui",
            next_id_if_selected: "",
            col_order: "1",
          },
        ],
        parameters: null,
        default_next_id: 7,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 7,
        question_name: "Veuillez entrer un nombre entre 10 et 100",
        question_subtitle: "Question Type 7: number",
        question_picture: null,
        question_required: true,
        question_type_id: 9,
        question_type_name: "number",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
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
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 8,
        question_name: "Quels sont vos langages de programmation préférés ?",
        question_subtitle: "Question Type 8: multiple choice",
        question_picture: null,
        question_required: true,
        question_type_id: 1,
        question_type_name: "multiple_choice",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: [
          {
            id: "6",
            label: "Python",
            picture:
              "https://via.placeholder.com/600x300/CD853F/e3e6e9?text=Placeholder",
            col_order: "2",
          },
          {
            id: "9",
            label: "JavaScript",
            picture:
              "https://via.placeholder.com/600x300/BC8F8F/e3e6e9?text=Placeholder",
            col_order: "5",
          },
          {
            id: "10",
            label: "Java",
            picture:
              "https://via.placeholder.com/600x300/F4A460/e3e6e9?text=Placeholder",
            col_order: "6",
          },
          {
            id: "11",
            label: "Rust",
            picture:
              "https://via.placeholder.com/600x300/DAA520/e3e6e9?text=Placeholder",
            col_order: "7",
          },
          {
            id: "5",
            label: "C#",
            picture:
              "https://via.placeholder.com/600x300/D2691E/e3e6e9?text=Placeholder",
            col_order: "1",
          },
          {
            id: "7",
            label: "C++",
            picture:
              "https://via.placeholder.com/600x300/A0522D/e3e6e9?text=Placeholder",
            col_order: "3",
          },
          {
            id: "8",
            label: "Kotlin",
            picture:
              "https://via.placeholder.com/600x300/A52A2A/e3e6e9?text=Placeholder",
            col_order: "4",
          },
        ],
        parameters: [
          {
            id: "12",
            name: "other",
            value: "true",
          },
          {
            id: "99",
            name: "picture",
            value: "false",
          },
        ],
        default_next_id: 9,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 9,
        question_name: "Quelle note donneriez-vous à cette application ?",
        question_subtitle: "Question Type 9: rating",
        question_picture: null,
        question_required: true,
        question_type_id: 5,
        question_type_name: "rating",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
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
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 10,
        question_name: "Veuillez entrer votre numéro de téléphone",
        question_subtitle: "Question Type 10: phone number",
        question_picture: null,
        question_required: true,
        question_type_id: 10,
        question_type_name: "phone_number",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: null,
        parameters: null,
        default_next_id: 12,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 11,
        question_name: "Bienvenue sur notre Survey Wizard",
        question_subtitle:
          "Cet exemple de l'application implémente une question pour chaque question type existant. Veuillez noter que cet exemple n'est pas lié à un back-end et que vos réponses ne sont sauvegardées qu'au niveau de votre navigateur.",
        question_picture:
          "https://via.placeholder.com/800x300/2e84dd/e3e6e9?text=Placeholder",
        question_type_id: 15,
        question_type_name: "welcome",
        box_values: null,
        parameters: null,
        default_next_id: 1,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 12,
        question_name: "Est-ce que vous avez des remarques ?",
        question_subtitle: "Question Type 11: long text",
        question_picture: null,
        question_required: true,
        question_type_id: 12,
        question_type_name: "long_text",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: null,
        parameters: null,
        default_next_id: 14,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 13,
        question_name: "Thank you for your submission",
        question_subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio incidunt sint cumque illo nobis exercitationem aliquam  repellendus.",
        question_picture:
          "https://via.placeholder.com/800x300/2e84dd/e3e6e9?text=Placeholder",
        question_type_id: 16,
        question_type_name: "thank_you",
        box_values: null,
        parameters: null,
        default_next_id: null,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 14,
        question_subtitle: "Question Type 12: file upload",
        question_name:
          "Veuillez uploader une photo de votre animal de compagnie",
        question_picture: null,
        question_required: false,
        question_type_id: 13,
        question_type_name: "file_upload",
        avatar_answer:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-10.png",
        avatar_question:
          "https://ya-webdesign.com/transparent250_/avatar-icon-png-9.png",
        box_values: null,
        parameters: null,
        default_next_id: 15,
      },
      {
        assessment_id: 13,
        assessment_name: "App Demo",
        assessment_creation_date: "2020-05-07 08:40:20",
        question_id: 15,
        question_name: "Voulez-vous soumettre vos réponses ?",
        question_subtitle:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum optio incidunt sint cumque illo nobis exercitationem aliquam  repellendus.",
        question_type_id: 17,
        question_type_name: "recap",
        box_values: null,
        parameters: [
          {
            id: "12",
            name: "question_tos_text",
            value:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, labore: ",
          },
          {
            id: "13",
            name: "question_tos_link",
            value: "http://google.be",
          },
        ],
        default_next_id: 13,
      },
    ],
    loadingQuestions: false, // switch to true
    errorLoadingQuestions: false,
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
