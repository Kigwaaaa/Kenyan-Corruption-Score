import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MinistryTable from '../components/MinistryTable';
import BudgetAnalysis from '../components/BudgetAnalysis';

const QUOTES = [
  {
    text: "The price of apathy toward public affairs is to be ruled by evil men.",
    author: "Plato"
  },
  {
    text: "Power tends to corrupt, and absolute power corrupts absolutely.",
    author: "Lord Acton"
  },
  {
    text: "Accountability is the glue that ties commitment to results.",
    author: "Bob Proctor"
  },
  {
    text: "In a democracy, the people get the government they deserve.",
    author: "Alexis de Tocqueville"
  },
  {
    text: "The only thing necessary for the triumph of evil is for good men to do nothing.",
    author: "Edmund Burke"
  },
  {
    text: "Transparency is the antidote to corruption.",
    author: "Kofi Annan"
  },
  {
    text: "Politicians are the same all over. They promise to build a bridge even where there is no river.",
    author: "Nikita Khrushchev"
  },
  {
    text: "Justice will not be served until those who are unaffected are as outraged as those who are affected.",
    author: "Benjamin Franklin"
  },
  {
    text: "A government that robs Peter to pay Paul can always depend on the support of Paul.",
    author: "George Bernard Shaw"
  },
  {
    text: "When the people fear the government, there is tyranny. When the government fears the people, there is liberty.",
    author: "Thomas Jefferson"
  }
];

function useTypingAnimation(text, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setIsTyping(true);
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(t => t + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return [displayed, isTyping];
}

const Home = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quote = QUOTES[quoteIdx] || {};
  const quoteText = typeof quote.text === 'string' ? quote.text : '';
  const quoteAuthor = typeof quote.author === 'string' ? quote.author : '';
  const [animatedText, isTyping] = useTypingAnimation(quoteText, 24);
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuoteIdx(i => (i + 1) % QUOTES.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [quoteIdx]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-kenya-black text-kenya-white py-20">
        <div className="container mx-auto px-2 max-w-screen-md md:max-w-3xl lg:max-w-4xl">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">
              Kenya Finance Watch
            </h1>
            <p className="text-lg md:text-xl text-center text-kenya-green font-medium mb-6 max-w-2xl mx-auto">
              Promoting transparency and accountability in Kenya's public finances. Explore sector budgets, ministry allocations, and corruption scores with interactive charts and data-driven insights.
            </p>
            <div className="text-sm md:text-base text-kenya-white italic text-center mb-6 min-h-[60px] transition-all duration-300 px-4 py-3 rounded-lg shadow-sm mx-auto max-w-2xl">
              <span>{animatedText}{isTyping && quoteText && <span className="blinking-cursor">|</span>}</span>
              {animatedText.length === quoteText.length && quoteText && (
                <>
                  <br />
                  {quoteAuthor && <span className="block mt-2 font-semibold text-kenya-green">— {quoteAuthor}</span>}
                </>
              )}
              <style>{`
                .blinking-cursor {
                  display: inline-block;
                  width: 1ch;
                  animation: blink 1s steps(1) infinite;
                }
                @keyframes blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Analysis Preview */}
      <section className="py-16 bg-kenya-black">
        <div className="container mx-auto px-2 max-w-screen-md md:max-w-3xl lg:max-w-4xl">
          <h2 className="text-xs font-bold text-center text-kenya-white mb-12">
            2024 Financial Bill Analysis
          </h2>
          <BudgetAnalysis />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-2 max-w-screen-md md:max-w-3xl lg:max-w-4xl text-center">
          <h2 className="text-xs font-bold text-kenya-white mb-6">
            Stay Informed About Government Spending
          </h2>
          <p className="text-xs text-gray-400 mb-8 max-w-2xl mx-auto">
            Access detailed information about ministry budgets, track spending patterns, and understand how public funds are being utilized.
          </p>
          <Link
            to="/ministries"
            className="inline-block bg-kenya-red text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Explore Ministry Details
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 