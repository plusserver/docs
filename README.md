# plusserver Kubernetes Engine: technical documentation repo

[plusserver Kubernetes Engine](https://www.plusserver.com/en/produkte/managed-kubernetes) is an enterprise-scale, open-source Kubernetes engine provided by [plusserver](https://plusserver.com). The technical documentation is published [here](https://docs.pske.get-cloud.io).

## Contributions

Hi, :wave: 
we welcome your contributions to our technical documentation! Whether you're fixing a typo, updating existing guides, or creating new ones, your contributions help us improve our documentation for the community.


To contribute, follow these steps:

1. Fork the repository by clicking the `Fork` button on GitHub.

2. Clone the forked repository to your local machine using the following command:

```bash
git clone https://github.com/pluscloudopen/pske-docs.git
```

3. Create a new branch to work on your changes:

```bash
git checkout -b my-new-branch
```

4. Make your changes to the documentation.

5. Commit your changes with a descriptive `commit` message.

6. Push your changes to your forked repository:

```bash
git push origin my-new-branch
```

7. Open a `pull request (PR)` from your forked repository to the original repository's `main` branch.

8. Wait for the documentation maintainers to review your changes. They may request changes or ask for more information before merging your changes.

### Developer Certificate of Origin (DCO) Sign Off

:warning: Important: All contributions __must__ follow our [Developer Certificate of Origin (DCO)](https://developercertificate.org/) sign off process, which means that you must include a `DCO Sign Off` in every commit message. You can do this by adding the `--signoff` flag to your `git commit` command:

```bash
# Sign off a commit as you're making it
git commit --signoff -m "Update README.md"

# Add a signoff to the last commit you made
git commit --amend --signoff

# Rebase your branch against master and sign off every commit in your branch
git rebase --signoff master
```

Please note that PRs without `DCO Sign Off` will not be accepted.

Thank you  for your contributions to our technical documentation! :rocket:


## Developing hugo/docsy 


### locally with VSCode

Ref: [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers)

1. Clone the GitHub repo to your local machine by running the following command in your terminal:

```bash
git clone https://github.com/pluscloudopen/pske-docs.git
```

2. Make sure you have Visual Studio Code (VSCode) installed on your machine. If you don't have it already, you can download it from the [official website](https://code.visualstudio.com/).

3. Once you have VSCode installed, open the repo directory in VSCode by clicking on `File -> Open Folder` and selecting the cloned repo directory.

4. VSCode will automatically detect that the repo contains `devcontainer` configuration file (`.devcontainer/devcontainer.json`) and ask if you want to reopen the folder in a container. Click `Reopen in Container` to continue.

5. Wait for the `devcontainer` to build and start, which may take a few minutes depending on your system's specifications and network speed.

6. Once the `devcontainer` is up and running, you can start working on your project inside the container. You can open a `terminal` in VSCode by clicking on `Terminal -> New Terminal`. From there, you can use all the tools and utilities that are installed inside the container.

7. When you're ready to `commit` and `push` your changes to the GitHub repo, simply use the Git CLI inside the container or the built-in Git extension in VSCode to commit and push your changes.


### GitHub codespaces

[Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart)

See above. By following these steps, you can use `devcontainers` in combination with GitHub codepages to create a consistent and reproducible development environment for your project, making it easy to collaborate with others and share your work with the wider community.
