import { FaCss3, FaHtml5, FaJs } from "react-icons/fa"
import { GrReactjs } from "react-icons/gr"
import { TbSvg } from "react-icons/tb";
import { BsFiletypeJson } from "react-icons/bs";
import { SiGitignoredotio } from "react-icons/si";
import { CgReadme } from "react-icons/cg";

export const FileIcon = ({ extension }) => {

    const IconMapper = {
        "js": <FaJs className="mt-2 dark:text-white" />,
        "jsx": <GrReactjs className="mt-2 dark:text-white" />,
        "css": <FaCss3 className="mt-2 dark:text-white"  />,
        "html": <FaHtml5 className="mt-2 dark:text-white" />,
        "svg":  <TbSvg className="mt-2 dark:text-white" />,
        "json": <BsFiletypeJson className="mt-2 dark:text-white" />,
        "gitignore": <SiGitignoredotio className="mt-2 dark:text-white" />,
        "md": <CgReadme className="mt-2 dark:text-white" />
    }

    return (
        <>
            {IconMapper[extension]}
        </>
    )
}