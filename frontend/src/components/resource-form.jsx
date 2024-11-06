"use client";
import { useState, useContext } from "react";
// import { Button, Input, Select, Textarea, Label } from "@shadcn/ui";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { Pending } from "@mui/icons-material";

const ResourceForm = () => {
  const [resource, setResource] = useState({
    title: "",
    type: "article", // Default type
    content: "",
    created_by: "",
    tags: [],
    status: "pending",
  });

  const { auth } = useAuthContext;

  //handles the title
  const handleTitleChange = (e) => {
    setResource((prevResource) => ({
      ...prevResource,
      title: e.target.value,
    }));
  };

  //handles the change in resource type
  const handleContentChange = (e) => {
    setResource((prevResource) => ({
      ...prevResource,
      content: e.target.value,
    }));
  };

  //Handle the select menu for resource type
  const handleTypeChange = (value) => {
    console.log(value);
    setResource((prevResource) => ({
      ...prevResource,
      type: value,
      content: "",
    }));
  };
  //Splits the tags input value by a comma "," and stores in a list
  const handleTagsChange = (e) => {
    const value = e.target.value.split(",").map((tag) => tag.trim());
    setResource((prevResource) => ({
      ...prevResource,
      tags: value,
    }));
  };

  //Form submit method, makes the API call.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResource((prevResource) => ({
      ...prevResource,
      created_by: (auth && auth.id) || undefined,
    }));
    console.log(resource);
    // TODO:  Implement API call to create resource
  };

  return (
    <div>
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Add a new resource
          </h1>
          <p className="text-xl mb-8">
            Upload a new resource for the community to learn from.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Resource Addition Form</CardTitle>
            <CardDescription>
              Fill out the details of the resource
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title:</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={resource.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Resource Type:</Label>
                <Select
                  name="type"
                  id="type"
                  value={resource.type}
                  onValueChange={handleTypeChange}
                  required
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Content:</Label>
                {(resource.type === "article" ||
                  resource.type === "tutorial") && (
                  <Textarea
                    name="content"
                    id="content"
                    value={resource.content}
                    onChange={handleContentChange}
                  />
                )}

                {(resource.type === "course" || resource.type === "video") && (
                  <Input
                    type="text"
                    placeholder="Enter url"
                    onChange={handleContentChange}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated):</Label>
                <Input
                  type="text"
                  name="tags"
                  id="tags"
                  onChange={handleTagsChange}
                />
              </div>
              <Button type="submit">Create Resource</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceForm;
