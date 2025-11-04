export default function Modal() {
    return <div
        className="fixed w-screen h-screen z-50 bg-[#0000009f]"
        onClick={onCloseEditModal}
    >
        <div
            className="absolute max-sm:w-full max-sm:-bottom-5 left-[50%] translate-x-[-50%] md:top-[50%] md:translate-y-[-50%] w-[500px] shadow-2xl "
            onClick={(e) => e.stopPropagation()}
        >
            <div className=" top-0 left-0 w-full bg-[#181818] h-full z-0 p-6 rounded-2xl fle flex-col">
                {/* HEADER */}
                <div className="header justify-between flex items-center bg-[#121212] rounded-3xl p-2 px-4 mb-4">
                    <p className="font-black text-2xl truncate">
                        Config {selectedTodo.title}
                    </p>
                    <Button Icon={<IcClose />} OnClick={onCloseEditModal} />
                </div>
                {/* CONTENT */}
                <div className="content">
                    <TextInput
                        Placeholder="Task title"
                        OnChange={onConfigTitleChanged}
                        Value={selectedTodo.title}
                        Label={{ Name: "Title", Icon: <IcChatBubble /> }}
                        SubmitConfig={{
                            Icon: <IcEdit />,
                            IconBlur: false,
                            Disabled: true,
                        }}
                    />
                </div>
                {/* FOOTER */}
                <div className="footer mt-12 left-0 p-4 flex justify-end items-center w-full gap-3">
                    <Button
                        Content="Accept"
                        className="bg-blue-500 hover:bg-white hover:text-gray-900"
                        Icon={<IcEdit />}
                        IconBlur={false}
                    />
                    <Button Content="Cancel" />
                </div>
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rainbow w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10 rounded-2xl"></div>
        </div>
    </div>
}