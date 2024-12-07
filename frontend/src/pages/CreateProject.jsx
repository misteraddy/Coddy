import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/hooks/apis/mutations/useCreateProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const CreateProject = () => {
  const { createProjectMutation, isLoading } = useCreateProject();

  async function handleCreateProject() {
    console.log("Going to trigger the API");
    try {
      await createProjectMutation();
      console.log("Now we should redirect to the editor");
    } catch (error) {
      console.log("Error creating project", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Create Your Playground
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center">
          <p className="text-gray-600 mb-4 text-center">
            Click the button below to start a new project. You’ll be redirected to the editor once it’s created.
          </p>
          <Button
            className="w-full flex items-center justify-center"
            onClick={handleCreateProject}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            Create Playground
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
