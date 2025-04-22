import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {toast} from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for demonstration
const mockContent = {
  aboutSection: {
    title: 'About BriyaniRiceExpress',
    description: 'BriyaniRiceExpress offers premium quality rice products for restaurants, distributors and dealers. We source directly from the best farms to ensure the highest quality for your business.'
  },
  banner: {
    title: 'Premium Rice Products',
    description: 'Quality rice products for all your business needs',
    buttonText: 'Shop Now',
    imageUrl: 'https://placeholder.com/banner.jpg'
  },
  contactInfo: {
    address: '123 Rice Street, Chennai, Tamil Nadu, India',
    phone: '+91 9876543210',
    email: 'contact@briyanirice.com',
    hours: 'Monday to Saturday: 9am - 6pm'
  }
};

export const ContentManager = () => {
  const [content, setContent] = useState(mockContent);

  const handleContentChange = (section: string, field: string, value: string) => {
    setContent({
      ...content,
      [section]: {
        ...content[section as keyof typeof content],
        [field]: value
      }
    });
  };

  const handleSaveContent = () => {
    // In a real app, you would call the API here
    toast.success("Content saved successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Website Content</h3>
        <Button onClick={handleSaveContent}>
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Update the about section that appears on the main page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="about-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="about-title"
              value={content.aboutSection.title}
              onChange={(e) => handleContentChange('aboutSection', 'title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="about-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="about-description"
              rows={4}
              value={content.aboutSection.description}
              onChange={(e) => handleContentChange('aboutSection', 'description', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveContent()}>Save About Section</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Main Banner</CardTitle>
          <CardDescription>Update the banner that appears on the main page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="banner-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="banner-title"
              value={content.banner.title}
              onChange={(e) => handleContentChange('banner', 'title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="banner-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="banner-description"
              rows={2}
              value={content.banner.description}
              onChange={(e) => handleContentChange('banner', 'description', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="banner-button" className="text-sm font-medium">
              Button Text
            </label>
            <Input
              id="banner-button"
              value={content.banner.buttonText}
              onChange={(e) => handleContentChange('banner', 'buttonText', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="banner-image" className="text-sm font-medium">
              Banner Image URL
            </label>
            <Input
              id="banner-image"
              value={content.banner.imageUrl}
              onChange={(e) => handleContentChange('banner', 'imageUrl', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveContent()}>Save Banner</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update the contact information displayed on the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="contact-address" className="text-sm font-medium">
              Address
            </label>
            <Textarea
              id="contact-address"
              rows={2}
              value={content.contactInfo.address}
              onChange={(e) => handleContentChange('contactInfo', 'address', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="contact-phone"
              value={content.contactInfo.phone}
              onChange={(e) => handleContentChange('contactInfo', 'phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="contact-email"
              type="email"
              value={content.contactInfo.email}
              onChange={(e) => handleContentChange('contactInfo', 'email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-hours" className="text-sm font-medium">
              Business Hours
            </label>
            <Input
              id="contact-hours"
              value={content.contactInfo.hours}
              onChange={(e) => handleContentChange('contactInfo', 'hours', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveContent()}>Save Contact Info</Button>
        </CardFooter>
      </Card>
    </div>
  );
};