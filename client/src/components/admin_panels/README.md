**This is admin zone!**

File [pages/Admin](../../pages/Admin.js) starts page "/admin" work.

All components we can divide into 3 groups: related to **constructor**,  related to **other tables** and **optimization** panel.

**Constructor forms:**

For every table (in DB), unrelated to constructor, created 2 components: 
1) Starts with "Create..."
2) Ends with "...Editor"

When admin clicks button "Добавить...", renders  "Create..." component.\
When he clicks "Редактировать...", renders "...Editor" component, where is he asked to select 1 record from the corresponding table, and next renders "Create..." component, where form fields are filled by current record data

**Other tables' forms:**

In the future, we are going to refactor these components, but let's describe current structure:
[CreateOrEditBlock.js](CreateOrEditBlock.js) consist all lines and forms with fields related to whole block (header, page name, itself index in page). Here  _CreateOrEditLine_ components are rendered in an amount equal to the current number of lines in the block\
[CreateOrEditLine.js](CreateOrEditLine.js) is line editing area
[BlocksEditor.js](BlocksEditor.js) is component, where admin chooses, what block he is going to edit
[BlocksSwap.js](BlocksEditor.js) is zone, where admin can swap blocks (not to edit them)

**Optimization panel** has buttons, having special function, created to optimise project file system and database. Now we can delete unused files by clicking on the corresponding button. Maybe several useful button are coming soon... 
