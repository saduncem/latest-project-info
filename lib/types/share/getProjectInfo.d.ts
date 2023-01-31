declare const getProjectInfo: () => {
    repositry: string;
    buildTime: string;
    gitRepoInfo: {
        commitMessage: string;
        committer: string;
        committerDate: string;
        branch: string;
    };
};
export default getProjectInfo;
