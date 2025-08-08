import * as React from "react";
import { AddRegular } from "@fluentui/react-icons";
import {
    Input,
    Tooltip,
    Button,
    Tag,
    TagGroup,
    makeStyles,
    shorthands
} from "@fluentui/react-components";

interface Props {
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        ...shorthands.padding("12px"),
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },

    tooltip: {
        backgroundColor: "#ffffff",
        color: "#323130",
        border: "1px solid #e1dfdd",
        borderRadius: "4px",
        padding: "6px 12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        fontSize: "11px",
        fontWeight: 500
    },

    tagGroup: {
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        padding: "4px",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        minHeight: "24px",
        maxHeight: "20vh", // responsive height
        overflowY: "auto",
        alignItems: "flex-start",
        boxSizing: "border-box",
        width: "100%",
        transition: "max-height 0.3s ease",
        scrollbarWidth: "thin",
        scrollbarColor: "#c8c6c4 #f3f2f1",

        "::webkit-scrollbar": {
            width: "6px"
        },
        "::webkit-scrollbar-thumb": {
            backgroundColor: "#c8c6c4",
            borderRadius: "3px"
        },

        // Responsive tweaks
        "@media (max-width: 768px)": {
            maxHeight: "30vh",
            gap: "6px"
        },
        "@media (max-width: 480px)": {
            maxHeight: "40vh",
            gap: "8px"
        }

    },

    tag: {
        backgroundColor: "rgb(207, 228, 250)", // soft base blue
        color: "rgb(17, 94, 163)", // D365 blue text
        borderRadius: "6px",
        padding: "1px 4px",
        fontSize: "8px",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        border: "1px solid rgb(207, 228, 250)", // matches hover tone
        transition: "background-color 0.2s ease",


        ":hover": {
            backgroundColor: "rgba(157, 203, 252, 1)" // hover highlight
        }
    },

    tagDismissIcon: {
        cursor: "pointer",
        fontSize: "6px",
        color: "#605e5c",

        ":hover": {
            color: "#0078d4"
        }
    },

    inputRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingBottom: "4px",
        //borderBottom: "1px solid #edebe9", // neutral light border
        transition: "border-color 0.2s ease",

        // Focus effect only
        ":focus-within": {
            borderBottom: "2px solid #0078d4" // D365 blue
        }
    }
    ,
    circularButton: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f2f1", // neutral background
        color: "#323130", // neutral foreground
        cursor: "pointer",
        border: "none",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        ...shorthands.padding("0"),

        // Hover effect
        ":hover": {
            backgroundColor: "#e1dfdd",
            boxShadow: "0 0 0 2px #605e5c",
        },

        // Focus effect
        ":focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #0078d4", // D365 primary blue
        }
    }
});

export const TagManagerComponent: React.FC<Props> = ({ tags, onAddTag, onRemoveTag }) => {
    const styles = useStyles();
    const [inputValue, setInputValue] = React.useState("");

    const handleAdd = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onAddTag(trimmed);
            setInputValue("");
        }
    };

    return (
        <div className={styles.container}>
            <TagGroup className={styles.tagGroup}>
                {tags.map(tag => (
                    <Tag
                        key={tag}
                        value={tag}
                        onClick={() => onRemoveTag(tag)}
                        dismissible
                        className={styles.tag}
                    >
                        {tag}
                    </Tag>
                ))}
            </TagGroup>

            <div className={styles.inputRow}>
                <Input
                    placeholder="..."
                    value={inputValue}
                    onChange={(e, data) => setInputValue(data.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd();
                        }
                    }}
                />

                <Tooltip
                    content={<span className={styles.tooltip}>Add tag</span>}
                    relationship="label"
                >
                    <Button
                        icon={<AddRegular />}
                        appearance="transparent"
                        onClick={handleAdd}
                        aria-label="+"
                        className={styles.circularButton}
                    />
                </Tooltip>
            </div>
        </div>
    );
};
