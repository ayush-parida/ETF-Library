"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructToModelGenerator = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class StructToModelGenerator {
    constructor(_templates, _model) {
        this._templates = _templates;
        this.templates = _templates;
        this.model = _model;
    }
    generateModel() {
        let out = [];
        out.push(this.templates.import);
        out.push(this.templates.table.replace("%TABLE_NAME%", this.model.TABLE_NAME));
        out.push(this.templates.class.replace("%CLASS_NAME%", this.model.CLASS_NAME));
        this.model.fields.forEach((field) => {
            if (field.primaryKey) {
                out.push(this.templates.primary);
            }
            if (field.autoIncrement) {
                out.push(this.templates.autoIncrement);
            }
            if (field.MIN || field.MAX) {
                let length = this.templates.length;
                let lengths = [];
                if (field.MIN) {
                    lengths.push(this.templates.min.replace("%MIN%", field.MIN.toString()));
                }
                if (field.MAX) {
                    lengths.push(this.templates.max.replace("%MAX%", field.MAX.toString()));
                }
                length = length.replace("%LENGTHS%", lengths.join(", ")) + "\n";
                out.push(length);
            }
            if (field.belongsTo) {
                out.push(this.templates.foreignKey.replace("%FOREIGN_MODEL%", field.belongsToData.FOREIGN_MODEL));
            }
            if (field.REGEX && field.REGEX_NAME) {
                let regexCondition = this.templates.regexCondition.replace("%REGEX_NAME%", field.REGEX_NAME);
                regexCondition = regexCondition.replace("%REGEX_NAME%", field.REGEX_NAME);
                regexCondition = regexCondition.replace("%REGEX%", field.REGEX);
                out.push(regexCondition + "\n");
            }
            if (field.IS_DATE) {
                out.push(this.templates.isDate);
            }
            if (field.IS_URL) {
                out.push(this.templates.isUrl);
            }
            if (field.BEFORE_YYYY_MM_DD) {
                out.push("%BEFORE_YYYY_MM_DD%", field.BEFORE_YYYY_MM_DD);
            }
            if (field.AFTER_YYYY_MM_DD) {
                out.push("%AFTER_YYYY_MM_DD%", field.AFTER_YYYY_MM_DD);
            }
            if (field.column) {
                let column = this.templates.column;
                if (field.UNIQUE ||
                    field.REQUIRED ||
                    field.DEFAULT_VALUE ||
                    field.COMMENT) {
                    column = column + this.templates.options;
                    let options = [];
                    if (field.UNIQUE) {
                        options.push(this.templates.unique.replace("%UNIQUE%", "true"));
                    }
                    if (field.REQUIRED) {
                        options.push(this.templates.required.replace("%REQUIRED%", "true"));
                    }
                    if (field.DEFAULT_VALUE) {
                        options.push(this.templates.default.replace("%DEFAULT_VALUE%", field.DEFAULT_VALUE));
                    }
                    if (field.COMMENT) {
                        options.push(this.templates.comment.replace("%COMMENT%", field.COMMENT));
                    }
                    column = column.replace("%OPTIONS%", options.join(", "));
                }
                else {
                    column = column + "\n";
                }
                out.push(column);
                let columnName = this.templates.columnName.replace("%COLUMN_NAME%", field.COLUMN_NAME);
                columnName = columnName.replace("%COLUMN_TYPE%", field.COLUMN_TYPE);
                out.push(columnName + "\n");
            }
            if (field.belongsTo) {
                let belongsTo = this.templates.belongsTo.replace("%FOREIGN_MODEL%", field.belongsToData.FOREIGN_MODEL);
                belongsTo = belongsTo.replace("%FOREIGN_COLUMN_NAME%", field.COLUMN_NAME);
                belongsTo = belongsTo + "\n";
                belongsTo =
                    belongsTo +
                        this.templates.belongsToName.replace("%BELONGS_TO_NAME%", field.belongsToData.BELONGS_TO_NAME);
                belongsTo = belongsTo.replace("%FOREIGN_MODEL%", field.belongsToData.FOREIGN_MODEL);
                out.push(belongsTo + "\n");
                let moduleImport = this.templates.moduleImport.replace("%IMPORT_MODEL_NAME%", field.belongsToData.FOREIGN_MODEL);
                moduleImport = moduleImport.replace("%IMPORT_MODEL_PATH%", field.belongsToData.IMPORTPATH);
                out.unshift(moduleImport + "\n");
            }
            if (field.hasMany) {
                let hasMany = this.templates.hasMany.replace("%HAS_MANY_MODEL%", field.hasManyData.HAS_MANY_MODEL);
                hasMany = hasMany.replace("%HAS_MANY_MODEL_PRIMARY_KEY%", field.hasManyData.HAS_MANY_MODEL_PRIMARY_KEY);
                hasMany = hasMany + "\n";
                hasMany = hasMany + this.templates.hasManyName;
                hasMany = hasMany.replace("%HAS_MANY_NAME%", field.hasManyData.HAS_MANY_NAME);
                hasMany = hasMany.replace("%HAS_MANY_MODEL%", field.hasManyData.HAS_MANY_MODEL);
                out.push(hasMany + "\n");
                let moduleImport = this.templates.moduleImport.replace("%IMPORT_MODEL_NAME%", field.hasManyData.HAS_MANY_MODEL);
                moduleImport = moduleImport.replace("%IMPORT_MODEL_PATH%", field.hasManyData.IMPORTPATH);
                out.unshift(moduleImport + "\n");
            }
        });
        out.push(this.templates.predefinedCols);
        out.push("}");
        return out.join("");
    }
    syncWriteFile(filename, data) {
        let status = false;
        try {
            (0, fs_1.writeFileSync)((0, path_1.join)(filename), data, {
                flag: "w",
            });
            const contents = (0, fs_1.readFileSync)((0, path_1.join)(filename), "utf-8");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            return status;
        }
    }
}
exports.StructToModelGenerator = StructToModelGenerator;
//# sourceMappingURL=structToModelGenerator.js.map