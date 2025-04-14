
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Check, Copy, Download } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AppScreenshotTaker = () => {
  const [screenshotTaken, setScreenshotTaken] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  
  const captureScreenshot = async () => {
    try {
      // In a real application, we would use html2canvas or a similar library
      // For this demo, we'll simulate a screenshot by creating a placeholder image
      setScreenshotTaken(true);
      setScreenshotUrl('/placeholder.svg');
      
      // In a real implementation:
      // const element = document.querySelector('#app-content');
      // const canvas = await html2canvas(element);
      // const dataUrl = canvas.toDataURL('image/png');
      // setScreenshotUrl(dataUrl);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };
  
  const copyScreenshot = () => {
    // In a real implementation:
    // navigator.clipboard.writeText(screenshotUrl);
    alert('Screenshot copied to clipboard (simulated)');
  };
  
  const downloadScreenshot = () => {
    // In a real implementation:
    // const a = document.createElement('a');
    // a.href = screenshotUrl;
    // a.download = 'smartmeeting-copilot-screenshot.png';
    // a.click();
    alert('Screenshot downloaded (simulated)');
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Application Screenshot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {!screenshotTaken ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Capture a screenshot of the entire application to showcase all components working together.
                This can be useful for documentation, presentations, or demonstrating the application to others.
              </p>
              <Button 
                onClick={captureScreenshot}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Capture Screenshot
              </Button>
            </>
          ) : (
            <>
              <Alert className="bg-green-50 text-green-700 border-green-200">
                <Check className="h-4 w-4 text-green-500" />
                <AlertDescription>
                  Screenshot captured successfully!
                </AlertDescription>
              </Alert>
              
              <div className="border rounded-md p-2 bg-slate-50">
                {screenshotUrl && (
                  <img 
                    src={screenshotUrl} 
                    alt="Application Screenshot" 
                    className="w-full h-auto rounded-md border shadow-sm"
                  />
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={copyScreenshot}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={downloadScreenshot}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppScreenshotTaker;
