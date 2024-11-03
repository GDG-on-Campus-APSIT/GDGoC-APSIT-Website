'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Camera, Biohazard } from 'lucide-react';
import Link from 'next/link'

const signUpSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  moodleId: z.string().min(5, { message: "Moodle ID must be at least 5 characters." }),
  admissionYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid 4-digit year." }),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender." }),
  dateOfBirth: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    { message: "Please enter a valid date in YYYY-MM-DD format." }
  ),
  course: z.string({ required_error: "Please select a course." }),
})

const courses = [
  "Computer Science",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
]

export function Signup() {
  const [step, setStep] = useState(1)
  const [idCardFile, setIdCardFile] = useState(null)
  const [selfieFile, setSelfieFile] = useState(null)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      moodleId: "",
      admissionYear: "",
      gender: undefined,
      dateOfBirth: "",
      course: "",
    },
  })

  function onSubmit(values) {
    if (step === 1) {
      setStep(2)
    } else {
      // Here you would typically send the form data, ID card, and selfie to your backend
      console.log(values, idCardFile, selfieFile)
      toast({
        title: "Sign up successful!",
        description: "Welcome to GDGoC APSIT. Please check your email to verify your account.",
      })
      router.push('/dashboard') // Redirect to dashboard or confirmation page
    }
  }

  const handleIdCardUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIdCardFile(event.target.files[0])
    }
  }

  const handleSelfieCapture = () => {
    // In a real application, you would implement webcam capture here
    // For this example, we'll simulate it with a file upload
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target).files?.[0]
      if (file) {
        setSelfieFile(file)
      }
    }
    input.click()
  }

  return (
    (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg py-8">
          <CardTitle className="text-3xl font-bold">Sign Up for GDGoC APSIT</CardTitle>
          <CardDescription className="text-blue-100">Join our community of developers and innovators</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Tabs value={step.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="1" disabled>Personal Information</TabsTrigger>
              <TabsTrigger value="2" disabled>Document Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="moodleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Moodle ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your Moodle ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <FormField
                      control={form.control}
                      name="admissionYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admission Year</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4">
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Male
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Female
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <Button type="submit" className="w-full">Next</Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="2">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="idCard">Upload ID Card</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input id="idCard" type="file" onChange={handleIdCardUpload} />
                      {idCardFile && <p className="text-sm text-green-600">File uploaded: {idCardFile.name}</p>}
                    </div>
                  </div>
                  <div>
                    <Label>Take a Selfie</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Button type="button" onClick={handleSelfieCapture}>
                        <Camera className="mr-2 h-4 w-4" /> Capture Selfie
                      </Button>
                      {selfieFile && <p className="text-sm text-green-600">Selfie captured: {selfieFile.name}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Biohazard className="mr-2 h-4 w-4" /> Complete Sign Up with Biohazard
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already a member?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Head to the login page
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>)
  );
}