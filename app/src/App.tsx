import { AppSidebar } from "@/components/Sidebar";
import { AddFriendForm } from "./components/AddFriendForm";
import { FriendList } from "./components/FriendList";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
function App() {
  return (
    <>
      <AppSidebar />
      <SidebarTrigger size={"lg"} />
      <div>
        <h1>My simple Dexie app</h1>
        <h2>Add Friend</h2>
        <AddFriendForm defaultAge={21} />
        <h2>Friend List</h2>
        <FriendList minAge={18} maxAge={65} />

        <Drawer>
          <DrawerTrigger
            asChild
            className="fixed bottom-3 right-3 rounded-full w-14 h-14"
          >
            <Button>Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default App;
