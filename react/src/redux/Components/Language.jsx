import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelLanguage } from "../slice/languageSlice";

const Language = () => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.language);

  const translations = {
    en: {
      title: "Welcome",
      paragraph:
        "Welcome to our CRM system. This application helps employees and administrators manage daily tasks efficiently. Users can view profiles, manage leave requests, update information, and access important company resources from a single platform.Learning new skills is one of the best ways to grow both personally and professionally. In today's rapidly changing world, technology and industries continue to evolve, making continuous learning essential. Whether it is learning a new language, mastering a programming framework, or improving communication skills, every new skill adds value to your life. Consistent learning not only increases confidence but also opens doors to new opportunities and career growth.",
    },

    ml: {
      title: "സ്വാഗതം",
      paragraph:
        "ഞങ്ങളുടെ CRM സിസ്റ്റത്തിലേക്ക് സ്വാഗതം. ഈ ആപ്ലിക്കേഷൻ ജീവനക്കാരെയും അഡ്മിനിസ്ട്രേറ്റർമാരെയും ദൈനംദിന പ്രവർത്തനങ്ങൾ കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യാൻ സഹായിക്കുന്നു.പുതിയ കഴിവുകൾ പഠിക്കുന്നത് വ്യക്തിപരമായും തൊഴിൽപരമായും വളരാനുള്ള മികച്ച മാർഗമാണ്. ഇന്നത്തെ വേഗത്തിൽ മാറിക്കൊണ്ടിരിക്കുന്ന ലോകത്തിൽ സാങ്കേതികവിദ്യയും വ്യവസായങ്ങളും നിരന്തരം വികസിച്ചുകൊണ്ടിരിക്കുകയാണ്. അതിനാൽ തുടർച്ചയായ പഠനം അനിവാര്യമാണ്. ഒരു പുതിയ ഭാഷ പഠിക്കുകയോ, ഒരു പ്രോഗ്രാമിംഗ് ഫ്രെയിംവർക്ക് പഠിക്കുകയോ, ആശയവിനിമയ കഴിവുകൾ മെച്ചപ്പെടുത്തുകയോ ചെയ്യുന്നതിലൂടെ ജീവിതത്തിൽ പുതിയ അവസരങ്ങൾ ലഭിക്കും. സ്ഥിരമായ പഠനം ആത്മവിശ്വാസം വർധിപ്പിക്കുകയും കരിയർ വളർച്ചയ്ക്ക് വഴിയൊരുക്കുകയും ചെയ്യുന്നു.",
    },

    hi: {
      title: "स्वागत है",
      paragraph:
        "हमारे CRM सिस्टम में आपका स्वागत है। यह एप्लिकेशन कर्मचारियों और प्रशासकों को दैनिक कार्यों को कुशलतापूर्वक प्रबंधित करने में मदद करता है।नई कौशल सीखना व्यक्तिगत और पेशेवर विकास के लिए अत्यंत महत्वपूर्ण है। आज की तेजी से बदलती दुनिया में तकनीक और उद्योग लगातार विकसित हो रहे हैं, इसलिए निरंतर सीखना आवश्यक हो गया है। चाहे वह नई भाषा सीखना हो, किसी प्रोग्रामिंग फ्रेमवर्क में महारत हासिल करना हो, या संचार कौशल को बेहतर बनाना हो, हर नई कौशल आपके जीवन में मूल्य जोड़ती है। नियमित रूप से सीखने से आत्मविश्वास बढ़ता है और नए अवसरों तथा करियर विकास के द्वार खुलते हैं।",
    },
  };

  const text = translations[language];
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">
          Current Language:
          <span> {language}</span>
        </h2>

        <div className="flex gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400"
            onClick={() => dispatch(channelLanguage("en"))}
          >
            English
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-400"
            onClick={() => dispatch(channelLanguage("ml"))}
          >
            Malayalam
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-400"
            onClick={() => dispatch(channelLanguage("hi"))}
          >
            {" "}
            Hindi
          </button>
        </div>
        <div className="max-w-2xl text-center">
          <h3 className="text-2xl font-semibold mb-3">{text.title}</h3>
          <p className="text-gray-700 dark:text-white">{text.paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Language;
