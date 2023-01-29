import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SchoolIcon from '@mui/icons-material/School';
import FastForwardIcon from '@mui/icons-material/FastForward';
import LanguageIcon from '@mui/icons-material/Language';
import ChatIcon from '@mui/icons-material/Chat';
import TagIcon from '@mui/icons-material/Tag';
import TerminalIcon from '@mui/icons-material/Terminal';
import ForumIcon from '@mui/icons-material/Forum';

export const arrayItems = [
    {
      name: "Q&A",
      id: "q&a",
      icon:<QuestionMarkIcon />,
      bgColor:"#7F52E0",
      description: "Answer questions based on existing knowledge",
      option: {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "Grammer Correction",
      id: "grammerCorrection",
      icon:<SchoolIcon />,
      bgColor:"#E06BE0",
      description: "Corrects sentences into standard English.",
      option: {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "Summarize for a 2nd grader",
      id: "summary",
      icon:<FastForwardIcon />,
      bgColor:"#F15459",
      description: "Translates difficult text into simpler concepts.",
      option: {
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "English to Other languages",
      id: "translate",
      icon:<LanguageIcon />,
      bgColor:"#8353E1",
      description: "Translates English text into French, Spanish and Japanese.",
      option: {
        model: "text-davinci-003",
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "Explain code",
      id: "explainCode",
      icon:<TagIcon />,
      bgColor:"#F15459",
      description: "Explain a complicated piece of code.",
      option: {
        model: "code-davinci-002",
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "JavaScript to Python",
      id: "jstopy",
      description: "Convert simple JavaScript expressions into Python.",
      icon:<TerminalIcon />,
      bgColor:"#DD5BDF",
      option: {
        model: "code-davinci-002",
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      name: "Chat",
      id: "conversation",
      description: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
      icon:<ForumIcon />,
      bgColor:"#1CBC84",
      option: {
        model:"text-davinci-003",
        temperature:0.9,
        max_tokens:150,
        top_p:1,
        frequency_penalty:0.0,
        presence_penalty:0.6,
        stop:[" Human:", " AI:"]
      },
    },
  ];