import Docker from 'dockerode';
const docker = new Docker();

export const listContainer = async () => {

    const containers = await docker.listContainers();
    console.log("Containers", containers);
    containers.forEach((containerInfo) => {
        console.log(containerInfo.Ports);
    })
}

export const handleContainerCreate = async (projectId, webSocketForTerminal) => {
    console.log("Project id received for container create", projectId);
    try {

        // Delete any existing container running with same name
        const existingContainer = await docker.listContainers({
            name: projectId
        });


        console.log("Existing container", existingContainer);

        if(existingContainer.length > 0) {
            console.log("Container already exists, stopping and removing it");
            const container = docker.getContainer(existingContainer[0].Id);
            await container.remove({force: true});
        }

        console.log("Creating a new container");

        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            name: projectId,
            Tty: true,
            User: "sandbox",
            Volumes: {
                "/home/sandbox/app": {}
            },
            ExposedPorts: {
                    "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [
                        {
                            "HostPort": "0"
                        }
                    ]
                },
                
            }
        });
    
        console.log("Container created", container.id);

        await container.start();

        console.log("container started");

        return container;



    } catch(error) {
        console.log("Error while creating container", error);
    }


}


export async function getContainerPort(containerName) {
    const container = await docker.listContainers({
        name: containerName
    });

    if(container.length > 0) {
        const containerInfo = await docker.getContainer(container[0].Id).inspect();
        console.log("Container info", containerInfo);
        try {
            return containerInfo?.NetworkSettings?.Ports["5173/tcp"][0].HostPort;
        } catch(error) {
            console.log("port not present");
            return undefined;
        }
        
    }
}