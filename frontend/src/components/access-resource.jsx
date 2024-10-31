'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Book, Code, Video, ArrowLeft, ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import Link from 'next/link'

// Mock data for demonstration purposes
const resourceData = {
  article: {
    title: "Introduction to Web Development",
    type: "Article",
    content: `
      <h2>Getting Started with Web Development</h2>
      <p>Web development is an exciting field that combines creativity with technical skills. In this article, we'll cover the basics of HTML, CSS, and JavaScript.</p>
      <h3>HTML: The Structure</h3>
      <p>HTML (HyperText Markup Language) is the backbone of any web page. It provides the structure and content.</p>
      <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
      </code></pre>
      <h3>CSS: The Style</h3>
      <p>CSS (Cascading Style Sheets) is used to style the HTML elements, controlling layout, colors, and more.</p>
      <pre><code>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}
      </code></pre>
      <h3>JavaScript: The Interactivity</h3>
      <p>JavaScript adds interactivity to web pages, allowing for dynamic content and user interactions.</p>
      <pre><code>
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#myButton');
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
      </code></pre>
      <p>This is just the beginning of your web development journey. Keep exploring and building!</p>
    `,
    author: "Jane Doe",
    date: "2023-10-26",
  },
  video: {
    title: "Machine Learning Fundamentals",
    type: "Video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with an actual educational video
    notes: [
      { time: "0:00", content: "Introduction to Machine Learning" },
      { time: "5:30", content: "Types of Machine Learning: Supervised, Unsupervised, and Reinforcement" },
      { time: "12:45", content: "Key Concepts: Training Data, Features, and Models" },
      { time: "20:15", content: "Popular Machine Learning Algorithms" },
      { time: "35:00", content: "Practical Applications of Machine Learning" },
      { time: "45:30", content: "Getting Started with ML Projects" },
    ],
  },
  tutorial: {
    title: "Building RESTful APIs",
    type: "Tutorial",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with an actual tutorial video
    steps: [
      {
        title: "Setting up the project",
        content: "First, let's set up our Node.js project and install necessary dependencies.",
        code: `
mkdir rest-api-tutorial
cd rest-api-tutorial
npm init -y
npm install express mongoose body-parser
        `,
      },
      {
        title: "Creating the server",
        content: "Now, let's create our main server file.",
        code: `
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/rest-api-tutorial', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log('Server running on port 3000'));
        `,
      },
      {
        title: "Defining the model",
        content: "Let's create a simple model for our API.",
        code: `
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);
        `,
      },
      {
        title: "Creating API routes",
        content: "Now, let's add some routes to our API.",
        code: `
const express = require('express');
const router = express.Router();
const Item = require('./models/Item');

// GET all items
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST a new item
router.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.json(savedItem);
});

module.exports = router;
        `,
      },
    ],
  },
  course: {
    title: "Full Stack Web Development",
    type: "Course",
    chapters: [
      {
        title: "Introduction to HTML",
        type: "article",
        content: `
          <h2>HTML Basics</h2>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
          <h3>Basic HTML Structure</h3>
          <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First HTML Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to HTML&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
          </code></pre>
        `,
      },
      {
        title: "CSS Fundamentals",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual CSS tutorial video
      },
      {
        title: "JavaScript Basics",
        type: "tutorial",
        steps: [
          {
            title: "Variables and Data Types",
            content: "Let's start with the basics of JavaScript variables and data types.",
            code: `
let name = "John Doe";
const age = 30;
var isStudent = true;

console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof isStudent); // "boolean"
            `,
          },
          {
            title: "Functions",
            content: "Functions are reusable blocks of code.",
            code: `
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice")); // "Hello, Alice!"
            `,
          },
        ],
      },
    ],
  },
}

// Mock discussion data
const discussionData = [
  {
    id: 1,
    user: "Alice",
    avatar: "/placeholder-user.jpg",
    content: "Great resource! I learned a lot from this.",
    timestamp: "2023-10-27T10:30:00Z",
    likes: 5,
    replies: [
      {
        id: 2,
        user: "Bob",
        avatar: "/placeholder-user.jpg",
        content: "I agree, very helpful!",
        timestamp: "2023-10-27T11:15:00Z",
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    user: "Charlie",
    avatar: "/placeholder-user.jpg",
    content: "Could you explain more about the third point?",
    timestamp: "2023-10-27T14:45:00Z",
    likes: 1,
  },
]

export function AccessResource({ resourceType = "article", resourceId = '1' }) {
  const [activeTab, setActiveTab] = useState('content')
  const [activeCourseChapter, setActiveCourseChapter] = useState(0)
  const [userReaction, setUserReaction] = useState(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [comments, setComments] = useState(discussionData)
  const [newComment, setNewComment] = useState('')
  const resource = resourceData[resourceType]

  const handleReaction = (reaction) => {
    setUserReaction(prevReaction => prevReaction === reaction ? null : reaction)
  }

  const handleBookmark = () => {
    setBookmarked(prev => !prev)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: "Current User",
        avatar: "/placeholder-user.jpg",
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
      }
      setComments([newCommentObj, ...comments])
      setNewComment('')
    }
  }

  const renderContent = () => {
    switch (resourceType) {
      case 'article':
        return (
          (<div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resource.content }} />)
        );
      case 'video':
        return (
          (<div className="space-y-4">
            <div className="aspect-video">
              <iframe src={resource.videoUrl} className="w-full h-full" allowFullScreen />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Video Notes</h3>
              {resource.notes.map((note, index) => (
                <div key={index} className="flex gap-2">
                  <span className="font-medium">{note.time}</span>
                  <span>{note.content}</span>
                </div>
              ))}
            </div>
          </div>)
        );
      case 'tutorial':
        return (
          (<div className="space-y-8">
            <div className="aspect-video">
              <iframe src={resource.videoUrl} className="w-full h-full" allowFullScreen />
            </div>
            {resource.steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p>{step.content}</p>
                <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                  <code>{step.code}</code>
                </pre>
              </div>
            ))}
          </div>)
        );
      case 'course':
        return (
          (<div className="space-y-4">
            <Tabs
              value={`chapter-${activeCourseChapter}`}
              onValueChange={(value) => setActiveCourseChapter(parseInt(value.split('-')[1]))}>
              <TabsList className="grid grid-cols-3 mb-4">
                {resource.chapters.map((chapter, index) => (
                  <TabsTrigger key={index} value={`chapter-${index}`}>
                    Chapter {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {resource.chapters.map((chapter, index) => (
                <TabsContent key={index} value={`chapter-${index}`}>
                  <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>
                  {chapter.type === 'article' && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: chapter.content }} />
                  )}
                  {chapter.type === 'video' && (
                    <div className="aspect-video">
                      <iframe src={chapter.videoUrl} className="w-full h-full" allowFullScreen />
                    </div>
                  )}
                  {chapter.type === 'tutorial' && (
                    <div className="space-y-8">
                      {chapter.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="space-y-2">
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <p>{step.content}</p>
                          <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>)
        );
      default:
        return <div>Resource type not supported</div>;
    }
  }

  const renderDiscussion = () => (
    <div className="space-y-6">
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} />
        <Button type="submit">Post Comment</Button>
      </form>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.user}</p>
                <p className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <p>{comment.content}</p>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {comment.likes}
              </Button>
              <Button variant="ghost" size="sm">Reply</Button>
            </div>
            {comment.replies && (
              <div className="ml-8 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={reply.avatar} alt={reply.user} />
                        <AvatarFallback>{reply.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{reply.user}</p>
                        <p className="text-sm text-gray-500">{new Date(reply.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <p>{reply.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    (<div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-4">
              {resourceType === 'article' && <Book className="h-8 w-8 text-blue-600" />}
              {resourceType === 'video' && <Video className="h-8 w-8 text-blue-600" />}
              {resourceType === 'tutorial' && <Code className="h-8 w-8 text-blue-600" />}
              {resourceType === 'course' && <Book className="h-8 w-8 text-blue-600" />}
              <div>
                <CardTitle className="text-2xl">{resource.title}</CardTitle>
                <CardDescription>{resource.type}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  {renderContent()}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="discussion">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  {renderDiscussion()}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={userReaction === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleReaction('like')}>
                <ThumbsUp className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button
                variant={userReaction === 'dislike' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleReaction('dislike')}>
                <ThumbsDown className="w-4 h-4 mr-1" />
                Dislike
              </Button>
              <Button
                variant={bookmarked ? 'default' : 'outline'}
                size="sm"
                onClick={handleBookmark}>
                <Bookmark className="w-4 h-4 mr-1" />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              {resourceType === 'article' && (
                <div className="text-sm text-gray-500">
                  By {resource.author} | Published on {resource.date}
                </div>
              )}
              <Button>Mark as Completed</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}