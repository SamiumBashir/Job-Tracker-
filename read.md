# The difference beetween getElementById, getElementsByClassName, and querySelector / querySelectorAll are:
getElementById andquerrySelector are the returns Single Element. But the getElementsByClassName is a HTMLCollection and querySelectorAll is NodeList. NodeList is not an array it actually array like object. so we can say querySelectorAll returns a array like object.
getElementById is a unique DOM. 

#How do you create and insert a new element into the DOM?

follow the step to create and insert a new element in the DOM:

| Step            | Method                                   |
| --------------- | ---------------------------------------- |
| Create element  | `document.createElement()`               |
| Add content     | `textContent` / `innerHTML`              |
| Add classes     | `classList.add()`                        |
| Insert into DOM | `append()`, `prepend()`, `appendChild()` |

# What is Event Bubbling? And how does it work?
its likely , we are having lauch with someones grandchild. In this time we asked him/her about his/her father. and then we meet his/her father asked his father name. Its the simple process to understand EventBubbling.

# 4. What is Event Delegation in JavaScript? Why is it useful?
By using Event Delegation we can attach a single event listener to a parent element. 

# 5. What is the difference between preventDefault() and stopPropagation() methods?

| Feature                      | `preventDefault()`                                                                          | `stopPropagation()`                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Purpose**                  | Stops the browser’s **default action** (like navigation, form submission, right-click menu) | Stops the event from **bubbling up** (or capturing down) the DOM |
| **Stops default behavior?**  | ✅ Yes                                                                                       | ❌ No                                                             |
| **Stops event propagation?** | ❌ No                                                                                        | ✅ Yes                                                            |
| **Typical Use Cases**        | Links, forms, keyboard shortcuts, drag/drop                                                 | Parent-child element events, delegated events                    |
| **Effect on Event Flow**     | Event still bubbles or captures normally                                                    | Event does **not** bubble to ancestors                           |
| **Return Value**             | None (affects browser behavior)                                                             | None (affects event flow)                                        |


 
