import { create } from "zustand";
import { QueryClient } from "react-query";
import { getDirectoryTree } from "@/apis/createProjectApi";


export const useDirectoryTreeStore = create((set,get) => {
    const queryClient = new QueryClient();

    return {
        projectId:null,
        treeStructure:null,
        setTreeStructure:async () => {

            const id = get().projectId ;

            const data = await queryClient.fetchQuery({

                queryKey: [`projectId-${id}`],
                queryFn:() => getDirectoryTree({projectId : id}),
            })

            set({
                treeStructure:data
            });
        },
        setProjectId: (projectId) => {
            set({
                projectId: projectId
            });
        }
    }
})