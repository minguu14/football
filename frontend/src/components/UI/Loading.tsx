export default function Loading() {
    return (
        <div className="relative inline-block w-20 h-20 my-4">
            <div className="box-border block absolute w-16 h-16 m-2 border-8 border-solid border-[#e30d5b] border-t-transparent border-b-transparent border-l-transparent rounded-full animate-lds-ring" style={{ animationDelay: '-0.45s' }}></div>
            <div className="box-border block absolute w-16 h-16 m-2 border-8 border-solid border-[#e30d5b] border-t-transparent border-b-transparent border-l-transparent rounded-full animate-lds-ring" style={{ animationDelay: '-0.3s' }}></div>
            <div className="box-border block absolute w-16 h-16 m-2 border-8 border-solid border-[#e30d5b] border-t-transparent border-b-transparent border-l-transparent rounded-full animate-lds-ring" style={{ animationDelay: '-0.15s' }}></div>
            <div className="box-border block absolute w-16 h-16 m-2 border-8 border-solid border-[#e30d5b] border-t-transparent border-b-transparent border-l-transparent rounded-full animate-lds-ring"></div>
        </div>
    );
}
