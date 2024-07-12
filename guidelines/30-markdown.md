# Markdown Guide

## Headers

```markdown
# H1
## H2
### H3
```

## Emphasis

```markdown
*This text will be italic*
**This text will be bold**
```

## Lists

```markdown
Unordered
* Item 1
* Item 2

Ordered
1. Item 1
2. Item 2
```

## Links

```markdown
[Link text](https://link.to/url)
```

## Images

You can specify an image using the standard markdown syntax for images:

```markdown
![Image description](path/to/image)
```

However, we recommend to use one of the image shortcodes available:

```markdown
{{< screenshot src="image.png" title="Headline for Image" >}}
Description of image with **markdown** __support__.
Placed between title and image.
{{< /screenshot >}}
```

or

```markdown
{{< img src="image.png" alt="Short Description of image shown as alt text or when hovering" >}}
```

The `image.png` is an example of an image file in your page bundle.
To create a page bundle, you just create a folder with a `_index.md` file inside.
The image path is relative to the folder containing the `_index.md` file.
Do not forget to add the frontmatter to the `_index.md` file.
If the image is not found, you will get a nil pointer exception when trying to build the site using `hugo --minify`.

## Code Blocks

```markdown
# ```javascript
# var s = "JavaScript syntax highlighting";
# alert(s);
# ```
```

Please use codeblock with the matching lanaguage highlighter.

## Docsy Info/Alert-Blocks

### Info

```markdown
{{% alert title="Info" %}}
This is a info.
{{% /alert %}}
```

### Alert

```markdown
{{% alert title="Warning" color="warning" %}}
This is a warning.
{{% /alert %}}
```
