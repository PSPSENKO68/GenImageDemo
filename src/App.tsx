import React, { useState } from 'react';
import { Sparkles, Image, Download, RefreshCw, Zap, Palette } from 'lucide-react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, use a beautiful placeholder image from Pexels
    const placeholderImages = [
      'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setGeneratedImage(randomImage);
    
    setHistory(prev => [prompt, ...prev.slice(0, 4)]);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.jpg`;
    link.click();
  };

  const quickPrompts = [
    'A serene mountain landscape at sunset',
    'Futuristic city with neon lights',
    'Abstract art with vibrant colors',
    'Peaceful garden with butterflies',
    'Space nebula with bright stars'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-300/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300/10 to-teal-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-2xl">
              <Sparkles className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
              AI Image Studio
            </h1>
          </div>
          <p className="text-white/95 text-xl font-medium drop-shadow-lg">
            Transform your imagination into stunning visuals with AI magic
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Input */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-2 rounded-xl shadow-lg">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Create Your Vision</h2>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to see... Be creative and detailed!"
                  className="w-full h-32 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none text-lg shadow-inner transition-all duration-300"
                />
                
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((quickPrompt, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(quickPrompt)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all duration-300 border border-white/30 hover:border-cyan-400/50 hover:scale-105 hover:shadow-lg"
                    >
                      {quickPrompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="group relative px-12 py-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:from-teal-500 hover:via-cyan-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 rounded-full font-bold text-white text-xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border border-white/20 hover:border-white/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-3 relative z-10">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 group-hover:animate-pulse" />
                      Generate Image
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Image */}
            {(generatedImage || isGenerating) && (
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg">
                      <Image className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">Generated Image</h3>
                  </div>
                  {generatedImage && (
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-medium transition-all duration-300 border border-white/30 hover:border-cyan-400/50 hover:scale-105 shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}
                </div>
                
                <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/30 shadow-inner">
                  {isGenerating ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/90 text-lg drop-shadow-lg">Creating your masterpiece...</p>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated artwork"
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Prompts */}
            {history.length > 0 && (
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-1.5 rounded-lg shadow-lg">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  Recent Prompts
                </h3>
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(item)}
                      className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/95 text-sm font-medium transition-all duration-300 border border-white/20 hover:border-cyan-400/50 hover:scale-105 shadow-lg backdrop-blur-md"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-1.5 rounded-lg shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Pro Tips
              </h3>
              <div className="space-y-3 text-white/95 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                  <p>Be specific about colors, lighting, and mood</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                  <p>Include artistic styles like "watercolor", "digital art", or "photorealistic"</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                  <p>Add details about composition and perspective</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                  <p>Use descriptive adjectives to enhance the result</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;