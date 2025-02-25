import PostForm from "@/components/application/PostForm"
import { Heart, BookOpen, Award, MessageCircle, TrendingUp } from "lucide-react"

export default function CreatePost() {
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-800 relative">
        <span className="bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">Create Your Story</span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"></div>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full">
          <div className="bg-white ">
            <div className="mb-4 flex items-center">
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              <h2 className="text-lg font-semibold text-pink-800">Share Your Thoughts</h2>
            </div>
            <PostForm />
          </div>
        </div>
        
        <div className="w-full space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-pink-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-bl-full"></div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-pink-500 mr-2" />
              <h2 className="text-lg font-semibold text-pink-800">Creator's Guide</h2>
            </div>
            
            <div className="space-y-5">
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-medium text-pink-800 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-pink-500" />
                  Tips for Trending Posts
                </h3>
                <ul className="mt-2 space-y-2">
                  {[
                    "Use a clear and catchy title that sparks curiosity",
                    "Include relevant tags to reach your target audience",
                    "Add high-quality images to make your post visually appealing",
                    "Structure your content with clear headings and sections",
                    "End with a question to encourage engagement"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                    <span className="inline-flex w-5 h-5 bg-pink-200 text-pink-700 rounded-full text-xs items-center justify-center mr-2 font-bold">
                        {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-medium text-pink-800 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2 text-pink-500" />
                  Post Preview
                </h3>
                <div className="mt-3 p-4 border border-pink-200 rounded-md min-h-32 bg-white">
                  <div className="flex space-x-2 mb-2">
                    <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">Preview</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">Draft</span>
                  </div>
                  <p className="text-gray-500 italic">Your beautiful story will appear here...</p>
                </div>
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-medium text-pink-800 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-pink-500" />
                  Community Values
                </h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Our community thrives on kindness and respect. Create content that inspires, 
                  educates, or entertains. We celebrate diverse perspectives and encourage 
                  thoughtful discussions that help everyone grow together.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Respect", "Kindness", "Authenticity", "Creativity", "Growth"].map((value) => (
                    <span key={value} className="px-3 py-1 bg-white border border-pink-200 rounded-full text-pink-700 text-sm">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}