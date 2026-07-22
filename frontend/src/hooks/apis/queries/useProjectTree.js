

export const useProjectTree = (projectId) => {
    const { data: projectTree, isLoading, error, isError } = useQuery({
        // queryKey: ['projectTree', projectId], // don't need cache for this query
        queryFn: () => getProjectTree(projectId),
    });


    return {
        isLoading,
        error,
        isError,
        projectTree,
    }
}