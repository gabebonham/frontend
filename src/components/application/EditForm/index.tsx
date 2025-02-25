import PostForm from "@/components/application/PostForm"
import { PenSquare, Sparkles, MessageCircle, History } from "lucide-react"

export default function EditForm() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-800 relative">
        <span className="bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
          Edit Your Story
        </span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"></div>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full">
          <div className="bg-white">
            <div className="mb-4 flex items-center">
              <PenSquare className="w-5 h-5 text-pink-500 mr-2" />
              <h2 className="text-lg font-semibold text-pink-800">Refine Your Post</h2>
            </div>
            <PostForm />
          </div>
        </div>
        
        <div className="w-full space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-pink-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-bl-full"></div>
            
            <div className="space-y-5">
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-medium text-pink-800 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-pink-500" />
                  Enhancement Tips
                </h3>
                <ul className="mt-2 space-y-2">
                  {[
                    "Review your title for clarity and impact",
                    "Check if your tags are still relevant",
                    "Consider adding new insights or updates",
                    "Ensure your content flows smoothly",
                    "Preview changes before saving"
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
                  Live Preview
                </h3>
                <div className="mt-3 p-4 border border-pink-200 rounded-md min-h-32 bg-white">
                  <div className="flex space-x-2 mb-2">
                    <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">
                      Current Version
                    </span>
                  </div>
                  <p className="text-gray-500 italic">Your updated story will appear here...</p>
                </div>
              </div>
              
              <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-medium text-pink-800 flex items-center">
                  <History className="w-4 h-4 mr-2 text-pink-500" />
                  Version History
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Original Version</span>
                    <span className="text-gray-400">Created {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current Edit</span>
                    <span className="text-pink-500 font-medium">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}