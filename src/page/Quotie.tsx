import { ChangeEvent, FormEvent, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

interface QuotieInputs {
  id: number;
  title: string;
  message: string;
}

const Quotie = () => {
  const [titleValue, setTitle] = useState<string>("");
  const [messageValue, setMessage] = useState<string>("");
  const [items, setItems] = useState<QuotieInputs[]>([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editId, setEditId] = useState<number>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (titleValue?.length < 1) {
      return toast.error("Title is required!");
    }
    if (messageValue?.length < 1) {
      return toast.error("Message is required!");
    }
    setItems([
      ...items,
      {
        id: Math.floor(1000 * Math.random() * 9000),
        title: titleValue,
        message: messageValue,
      },
    ]);
    setTitle("");
    setMessage("");
  };

  const handleDelete = async (quoteId: number) => {
    console.log("received-id", quoteId);
    const quoties = items?.filter((elem) => elem?.id !== quoteId);
    setItems(quoties);
    await new Promise(() => {
      toast.success("Deleted");
    });
  };

  const confirmEdit = () => {
    setItems(
      items?.map((elem) => {
        if (elem?.id === editId) {
          return {
            id: Math.floor(1000 * Math.random() * 9000),
            title: titleValue,
            message: messageValue,
          };
        }
        setTitle("");
        setMessage("");
        setToggleEdit(false);
        return elem;
      })
    );
  };

  const handleEdit = (quoteId: number) => {
    setEditId(quoteId);
    setToggleEdit((prev) => !prev);
    const quoties = items?.filter((elem) => elem?.id === quoteId);
    console.log("eidtable", quoties[0].title);
    setTitle(quoties[0]?.title);
    setMessage(quoties[0]?.message);
  };
  return (
    <section className="max-w-[90%] mx-auto mt-10">
      <h1 className="text-center text-5xl my-10 italic">
        Quotie
        <span className="textPurple not-italic"> Form</span>
      </h1>
      <div className="max-w-2xl mx-auto">
        <form className="grid gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-[1.4rem]">
              Title
            </label>
            <input
              type="text"
              className="rounded-lg outline-none px-5 text-[1.5rem] p-1"
              placeholder="Enter title"
              value={titleValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="message" className="text-[1.4rem]">
              Message
            </label>
            <textarea
              placeholder="Enter message"
              className="rounded-lg outline-none p-1 px-5 text-[1.5rem]"
              rows={5}
              value={messageValue}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(event.target.value)
              }
            ></textarea>
          </div>
          <div>
            {toggleEdit ? (
              <button
                onClick={confirmEdit}
                type="button"
                className="border-[--my-purple] border-2 textPurple hover:bg-[#cb57f7] hover:text-white text-[1.2rem] rounded text-white font-semibold w-44 p-2"
              >
                Confirm
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                type="button"
                className="border-[--my-purple] border-2 textPurple hover:bg-[#cb57f7] hover:text-white text-[1.2rem] rounded text-white font-semibold w-44 p-2"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        <ul className="flex gap-3 flex-wrap">
          {items
            ?.slice()
            ?.reverse()
            ?.map((item) => {
              return (
                <li
                  className="flex flex-col border-2 w-64 p-2 rounded-xl border-[--my-purple] text-white text-lg"
                  key={item.id}
                >
                  <h1 className="text-[1.2rem] font-semibold">{item.title}</h1>
                  <p className="text-[.95rem]">{item.message}</p>
                  {/* functional buttons */}
                  <div className="flex items-center gap-2">
                    <RiDeleteBin6Fill
                      className="cursor-pointer"
                      onClick={() => handleDelete(item?.id)}
                      color="red"
                      size={25}
                    />
                    <FaEdit
                      onClick={() => handleEdit(item?.id)}
                      className="cursor-pointer"
                      color="red"
                      size={25}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <Toaster />
    </section>
  );
};

export default Quotie;
