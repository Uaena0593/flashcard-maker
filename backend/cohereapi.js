import {CohereClient } from "cohere-ai"

const cohere = new CohereClient({
    token: "bisFU3xxdGNMKdtG9PLFa58hODnaNUhdH4iXdJbZ",
});

(async () => {
  const classify = await cohere.classify({
      examples: [
        { text: "Negative Identity: Selection of an identity that is undesirable in the eyes of significant others and the broader community.", label: "definition" },
        { text: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.", label: "definition" },
        { text: "The Earth rotates on its axis, completing one full rotation approximately every 24 hours.", label: "definition" },
        { text: "Mount Everest is the highest peak in the world, reaching an elevation of 29,032 feet (8,848 meters) above sea level.", label: "definition" },
        { text: "Rivers are natural watercourses, typically having a source, a course, and a mouth, where they flow into another body of water.", label: "definition" },
        { text: "Gravity is the force that attracts two objects with mass toward each other, giving weight to physical objects.", label: "definition" },
        { text: "The Mona Lisa is a famous portrait painting by Leonardo da Vinci, known for its enigmatic smile.", label: "definition" },
        { text: "Eclipses occur when one celestial body moves into the shadow of another, like a solar eclipse where the Moon blocks the Sun.", label: "definition" },
        { text: "In literature, irony is a rhetorical device or figure of speech in which the intended meaning of words is opposite to their literal or usual meaning.", label: "definition" },
        { text: "Photosynthesis happens at a cellular level in plant cells, involving complex biochemical processes.", label: "definition" },
        { text: "Elephants are the largest land animals, characterized by their long trunks, large ears, and tusks.", label: "definition" },
        { text: "The cat sat on the mat, purring contentedly.", label: "not definition" },
        { text: "John likes to take long walks in the evening to relax.", label: "not definition" },
        { text: "Chocolate chip cookies are a popular treat enjoyed by people of all ages.", label: "not definition" },
        { text: "The weekend is a time for leisure and spending time with family and friends.", label: "not definition" },
        { text: "Mountains are majestic formations that inspire awe and wonder in those who behold them.", label: "not definition" },
        { text: "The color blue is often associated with calmness and tranquility.", label: "not definition" },
        { text: "Listening to music can have a profound impact on one's mood and emotions.", label: "not definition" },
        { text: "Learning a new language broadens one's understanding of different cultures.", label: "not definition" },
        { text: "The feeling of sand between your toes on a sunny beach day is pure bliss.", label: "not definition" },
        { text: "Time management is a skill that can greatly contribute to personal and professional success.", label: "not definition" },
        { text: "Gravity pulls objects towards the center of the Earth, keeping them anchored to its surface.", label: "definition" },
        { text: "The concept of democracy involves a system of government where citizens participate in decision-making through voting.", label: "definition" },
        { text: "The moonlight shimmered on the calm surface of the lake, creating a serene atmosphere.", label: "not definition" },
        { text: "Swimming is a popular recreational activity that involves moving through water using various strokes.", label: "definition" },
        { text: "The joy of laughter is contagious, often bringing people together in moments of happiness.", label: "not definition" },
        { text: "In computer programming, algorithms are step-by-step procedures for solving problems or performing tasks.", label: "definition" },
        { text: "The aroma of freshly baked bread wafted through the air, tempting everyone in the vicinity.", label: "not definition" },
        { text: "The concept of time travel, as depicted in science fiction, explores the possibility of moving between different points in time.", label: "definition" },
        { text: "Cats are known for their independent nature, often choosing solitude over constant companionship.", label: "not definition" },
        { text: "Cellular respiration is a biological process that releases energy from organic compounds in cells.", label: "definition" },

        { text: "Jogging in the park is a great way to stay active and improve cardiovascular health.", label: "not definition" },
        { text: "The principle of supply and demand is a fundamental concept in economics that influences prices in a market.", label: "definition" },
        { text: "Sunsets paint the sky with vibrant hues, creating a breathtaking visual display.", label: "not definition" },
        { text: "The concept of justice involves fairness and the equitable treatment of individuals within a society.", label: "definition" },
        { text: "Playing musical instruments can be a fulfilling hobby that allows individuals to express themselves creatively.", label: "not definition" },
        { text: "Mitosis is a cellular process in which a single cell divides into two identical daughter cells.", label: "definition" },
        { text: "Hiking through the dense forest, the explorer marveled at the diverse flora and fauna.", label: "not definition" },
        { text: "The Golden Gate Bridge is an iconic landmark in San Francisco, known for its majestic architecture.", label: "definition" },
        { text: "Rainbows are optical and meteorological phenomena that result from the refraction, dispersion, and reflection of light.", label: "definition" },
        { text: "The scent of lavender is often associated with relaxation and is used in aromatherapy.", label: "not definition" },

        { text: "Renewable energy sources, such as solar and wind power, aim to reduce dependence on non-renewable fossil fuels.", label: "definition" },
        { text: "The feeling of sand between your toes and the sound of waves crashing create a perfect beach experience.", label: "not definition" },
        { text: "The concept of biodiversity refers to the variety of life on Earth, including different species and ecosystems.", label: "definition" },
        { text: "Learning a new language opens doors to different cultures and enhances communication.", label: "not definition" },
        { text: "Evolution is the process of gradual changes in living organisms over long periods, leading to the diversity of life.", label: "definition" },
        { text: "The art of storytelling has been an integral part of human culture, passing down knowledge and traditions.", label: "not definition" },
        { text: "The Great Wall of China is a historical marvel, stretching across thousands of miles with a rich cultural significance.", label: "definition" },
        { text: "In psychology, cognitive dissonance refers to the discomfort from holding conflicting beliefs or attitudes.", label: "definition" },
        { text: "Cycling through scenic landscapes can be both a recreational activity and an environmentally friendly mode of transportation.", label: "not definition" },
        { text: "Plate tectonics is a geological theory explaining the movement and interaction of Earth's lithospheric plates.", label: "definition" },
        { text: "The taste of ripe strawberries on a summer day is a delightful and refreshing experience.", label: "not definition" },
        { text: "The concept of equality advocates for fair treatment and opportunities for all individuals, irrespective of differences.", label: "definition" },
        { text: "Sailing across the calm waters, the sailor enjoyed the tranquility of the open sea.", label: "not definition" },
        { text: "The concept of climate change involves long-term shifts in global or regional weather patterns.", label: "definition" },
        { text: "Negative Identity: Selection of an identity that is undesirable in the eyes of significant others and the broader community.", label: "definition" },
        { text: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.", label: "definition" },
        { text: "The Earth rotates on its axis, completing one full rotation approximately every 24 hours.", label: "definition" },
        { text: "Mount Everest is the highest peak in the world, reaching an elevation of 29,032 feet (8,848 meters) above sea level.", label: "definition" },
        { text: "Rivers are natural watercourses, typically having a source, a course, and a mouth, where they flow into another body of water.", label: "definition" },
        { text: "Gravity is the force that attracts two objects with mass toward each other, giving weight to physical objects.", label: "definition" },
        { text: "The Mona Lisa is a famous portrait painting by Leonardo da Vinci, known for its enigmatic smile.", label: "definition" },
        { text: "Eclipses occur when one celestial body moves into the shadow of another, like a solar eclipse where the Moon blocks the Sun.", label: "definition" },
        { text: "In literature, irony is a rhetorical device or figure of speech in which the intended meaning of words is opposite to their literal or usual meaning.", label: "definition" },
        { text: "Photosynthesis happens at a cellular level in plant cells, involving complex biochemical processes.", label: "definition" },
        { text: "Elephants are the largest land animals, characterized by their long trunks, large ears, and tusks.", label: "definition" },

        { text: "The cat sat on the mat, purring contentedly.", label: "not definition" },
        { text: "John likes to take long walks in the evening to relax.", label: "not definition" },
        { text: "Chocolate chip cookies are a popular treat enjoyed by people of all ages.", label: "not definition" },
        { text: "The weekend is a time for leisure and spending time with family and friends.", label: "not definition" },
        { text: "Mountains are majestic formations that inspire awe and wonder in those who behold them.", label: "not definition" },
        { text: "The color blue is often associated with calmness and tranquility.", label: "not definition" },
        { text: "Listening to music can have a profound impact on one's mood and emotions.", label: "not definition" },
        { text: "Learning a new language broadens one's understanding of different cultures.", label: "not definition" },
        { text: "The feeling of sand between your toes on a sunny beach day is pure bliss.", label: "not definition" },
        { text: "Time management is a skill that can greatly contribute to personal and professional success.", label: "not definition" },
      ],
      inputs: [
          { }
        ]
})

  console.log(classify);
})();



   <form className="flex flex-col justify-center items-center" onSubmit={ converterSubmit }>

        <input className="bg-gray-200 mb-3 pl-4 h-12 w-60 border-transparent text-xl rounded-xl focus:outline-none"
            type="text"
            placeholder="converted stuff..."
            value= {input }
            onChange={(e) => setInput(e.target.value)}
            >
            <button type = 'submit'></button>
        </input>
        </form>
});
