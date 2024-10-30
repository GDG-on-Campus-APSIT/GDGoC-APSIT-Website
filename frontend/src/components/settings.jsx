'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from 'lucide-react'

export function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    clubName: "GDGoC APSIT",
    description: "Google Developer Group on Campus at A.P. Shah Institute of Technology",
    email: "contact@gdgocapsit.com",
    enableRegistrations: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "user@example.com",
    smtpPassword: "",
    enableEmailNotifications: true,
  })

  const handleGeneralSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleEmailSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setEmailSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", { generalSettings, emailSettings })
    // Implement API call to save settings
  }

  return (
    (<div className="min-h-screen bg-gray-50">
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Settings</h1>
          <p className="text-xl mb-8">Configure your GDGoC APSIT website</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="email">Email Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general website settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    name="clubName"
                    value={generalSettings.clubName}
                    onChange={handleGeneralSettingsChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={generalSettings.description}
                    onChange={handleGeneralSettingsChange} />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={handleGeneralSettingsChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableRegistrations"
                    name="enableRegistrations"
                    checked={generalSettings.enableRegistrations}
                    onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, enableRegistrations: checked }))} />
                  <Label htmlFor="enableRegistrations">Enable User Registrations</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email server settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange} />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange} />
                </div>
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange} />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableEmailNotifications"
                    name="enableEmailNotifications"
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableEmailNotifications: checked }))} />
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>)
  );
}