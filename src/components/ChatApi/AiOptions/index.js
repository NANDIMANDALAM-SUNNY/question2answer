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
      example:"Who is the prime minister of india",
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
      example:"Correct this to standard English:She no went to the market.",
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
      example:"Summarize this for a second-grade student:Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth",
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
      example:"Translate this into 1. French, 2. Spanish and 3. Japanese:What rooms do you have available?",
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
      example:"Explain a complicated piece of code: print('Hello, world')",
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
      example:"#JavaScript to Python:JavaScript:consoele.log('Hello World');Python:",
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
      example:"Did you watch anything interesting?",
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