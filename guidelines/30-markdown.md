# Markdown Guide

## Headers

```
# H1
## H2
### H3
```

## Emphasis

```
*This text will be italic*
**This text will be bold**
```
## Lists

```
Unordered
* Item 1
* Item 2

Ordered
1. Item 1
2. Item 2
```

## Links

```
[Link text](https://link.to/url)
```

## Images

```
![Image description](path/to/image || base64)
```

Please use the in-document-base64 style.

## Code Blocks

```
# ```javascript
# var s = "JavaScript syntax highlighting";
# alert(s);
# ```
```

Please use codeblock with the matching lanaguage highlighter.

## Docsy Info/Alert-Blocks

### Info

```
{{% alert title="Info" %}}
This is a info.
{{% /alert %}}
```

### Alert

```
{{% alert title="Warning" color="warning" %}}
This is a warning.
{{% /alert %}}
```
